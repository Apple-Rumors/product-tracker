import React from 'react';
import moment from 'moment';
import { calculateDaysBetweenDates } from '@/utils';

function GenerationItem({ gen, index, sortedGenerations }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mb-4">
      <h3 className="text-2xl font-bold text-blue-600 mb-2">{gen.generation}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gen.announced && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Announced:</span>
            <span className="text-gray-900">{moment(gen.announced).format('MMMM Do, YYYY')}</span>
          </div>
        )}
        {gen.releasedWith && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Released with:</span>
            <span className="text-gray-900">{gen.releasedWith}</span>
          </div>
        )}
        {gen.releaseDate && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Release Date:</span>
            <span className="text-gray-900">{moment(gen.releaseDate).format('MMMM Do, YYYY')}</span>
          </div>
        )}
        <div className="flex items-center">
          <span className="font-medium text-gray-700 mr-2">Discontinued:</span>
          <span className="text-gray-900">{gen.discontinued ? moment(gen.discontinued).format('MMMM Do, YYYY') : 'N/A'}</span>
        </div>
        {gen.finalSupportedOS && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Final Supported OS:</span>
            <span className="text-gray-900">{gen.finalSupportedOS}</span>
          </div>
        )}
        {gen.supportStatus !== null && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Support Status:</span>
            <span className={`text-${gen.supportStatus ? 'green' : 'red'}-600`}>
              {gen.supportStatus ? 'Supported' : 'Unsupported'}
            </span>
          </div>
        )}
        {index < sortedGenerations.length - 1 && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Days since last release:</span>
            <span className="text-gray-900">
              {calculateDaysBetweenDates(gen.releaseDate, sortedGenerations[index + 1].releaseDate)}
            </span>
          </div>
        )}
      </div>
      {gen.supportStatus === false && gen.discontinued && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
          <p className="font-bold">Discontinued</p>
          <p>This model was discontinued on {moment(gen.discontinued).format('MMMM Do, YYYY')}.</p>
        </div>
      )}
    </div>
  );
}

export default GenerationItem;
