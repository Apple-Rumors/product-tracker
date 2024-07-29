import moment from 'moment';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { productSchema } from '@/schemas';
import {
  calculateDaysBetweenDates,
  calculateAverageDays,
  calculateAverageLifespan
} from '@/utils';

import GenerationItem from './generation-item.jsx';

function GenerationDetail() {
  let { product, generation } = useParams();
  product = product.toLowerCase();  // Convert to lowercase to ensure case insensitivity
  generation = generation.toLowerCase();  // Convert to lowercase to ensure case insensitivity

  let [data, setData] = useState(null);
  let [intervals, setIntervals] = useState([]);
  let [error, setError] = useState(null);

  useEffect(() => {
    import(`@/data/${product}.json`).then(module => {
      let productData = module.default[product];
      let item = productData.find(item => item.model.replace(/\s+/g, '-').toLowerCase() === generation);

      if (item) {
        // Validate data
        productSchema.validate(item, { abortEarly: false })
          .then(validatedData => {
            setData(validatedData);

            let intervals = [];
            for (let i = 1; i < validatedData.generations.length; i++) {
              intervals.push(calculateDaysBetweenDates(validatedData.generations[i].releaseDate, validatedData.generations[i - 1].releaseDate));
            }
            setIntervals(intervals);
          })
          .catch(err => {
            console.warn("Validation Warning:", err);
            setData(item);

            let intervals = [];
            for (let i = 1; i < item.generations.length; i++) {
              intervals.push(calculateDaysBetweenDates(item.generations[i].releaseDate, item.generations[i - 1].releaseDate));
            }
            setIntervals(intervals);
          });
      } else {
        setError(new Error('Item not found'));
      }
    }).catch(err => {
      setError(err);
    });
  }, [product, generation]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  let sortedGenerations = data.generations.slice().sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  let averageDays = calculateAverageDays(intervals);
  let lastReleaseDate = moment(sortedGenerations[0].releaseDate);
  let daysSinceLastRelease = moment().diff(lastReleaseDate, 'days');
  let isImminent = daysSinceLastRelease >= averageDays * 0.9 && sortedGenerations[0].supportStatus; // Consider imminent if it's close to the average cycle and supported
  let averageLifespan = calculateAverageLifespan(sortedGenerations);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">{data.model}</h2>
      {isImminent && (
        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p className="font-bold">Update Imminent!</p>
          <p>Based on the average update cycle, an update is likely soon.</p>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-lg">Average days between updates: <strong>{averageDays} days</strong></p>
        <p className="text-lg">Days since last update: <strong>{daysSinceLastRelease} days</strong></p>
        <p className="text-lg">Average supported lifespan: <strong>{averageLifespan} days</strong></p>
      </div>
      <div className="space-y-4">
        {sortedGenerations.map((gen, index) => (
          <GenerationItem key={gen.generation} gen={gen} index={index} sortedGenerations={sortedGenerations} />
        ))}
      </div>
    </div>
  );
}

export default GenerationDetail;
