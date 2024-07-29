# Apple Product Update Tracker

This project provides a guide to Apple product updates, including iPhones, iPads, Macs, and
Wearables. It allows users to see the update cycles, support status, and other relevant information
for different generations of Apple products.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
  - [Data Structure](#data-structure)
  - [Schema Validation](#schema-validation)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 20.x)
- npm (>= 9.x)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Apple-Rumors/product-tracker.git
cd product-tracker
```

2. **Install dependencies:**

```bash
npm install
```

### Running the App

To start the development server, run:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

### Data Structure

The data for the Apple products is stored in JSON files within the `src/data` directory. Each
product category (iPhones, iPads, Macs, Wearables) has its own JSON file. The structure of the data
is as follows:

```json
{
  "model": "String",
  "generations": [
    {
      "generation": "String",
      "announced": "Date",
      "releaseDate": "Date",
      "discontinued": "Date or null",
      "finalSupportedOS": "String",
      "supportStatus": "Boolean",
      "releasedWith": "String"
    }
  ]
}
```

### Schema Validation

Schema validation is performed using [Yup](https://www.npmjs.com/package/yup). The schema
definitions are located in the `src/schemas` directory. Here is an example of the schema used for
validation:

```javascript
import * as yup from 'yup';

export const generationSchema = yup.object().shape({
  generation: yup.string().required(),
  announced: yup.date().nullable(),
  releaseDate: yup.date().nullable(),
  discontinued: yup.date().nullable(),
  finalSupportedOS: yup.string().nullable(),
  supportStatus: yup.boolean().required(),
  releasedWith: yup.string().nullable(),
});

export const productSchema = yup.object().shape({
  model: yup.string().required(),
  generations: yup.array().of(generationSchema).required(),
});

export default productSchema;
```

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International
License. See the [LICENSE](./LICENSE) file for more information.
