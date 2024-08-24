# Mazaady Frontend Task

## Project Overview

This project is a frontend implementation of the Mazaady, developed as part of a coding task. It showcases a dynamic form with searchable dropdown menus and a static page design, built using Nuxt.js and styled with Tailwind CSS.

## Live Demo

You can view the live version of this project at: [https://mazaady-task-jet.vercel.app/](https://mazaady-task-jet.vercel.app/)
or
https://mazaady-task-3u1n42bgk-shehab267s-projects.vercel.app/form

## Features

1. **Dynamic Form Component:** [live](https://mazaady-task-jet.vercel.app/form)

   - Main category and subcategory searchable dropdown menus
   - Dynamic generation of property fields based on category selection
   - Support for nested properties (e.g., brand => model => type)
   - "Other" option for custom input
   - Submission of selected values displayed in a table

2. **Static Page Design:** [live](https://mazaady-task-jet.vercel.app/)
   - Implementation of the provided Figma design

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: yarn install
3. Set up environment:

   - Remove `.example` from `.env.example`

4. yarn dev
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## API Integration

This project integrates with the following Mazaady APIs:

1. Get all categories: `https://staging.mazaady.com/api/v1/get_all_cats`
2. Get properties for a subcategory: `https://staging.mazaady.com/api/v1/properties?cat={subcategory_id}`
3. Get child options: `https://staging.mazaady.com/api/v1/get-options-child/{option_id}`

Note: You'll need to use the provided private key for API authentication.

## Deployment

This project is deployed on Vercel. For deployment instructions, please refer to the [Vercel documentation for Nuxt.js](https://vercel.com/guides/deploying-nuxt-with-vercel).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
