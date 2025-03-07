# Aquifer Images Extension

A Theia extension for browsing, searching, and embedding biblical images from the Aquifer Bible Resources API.

## Overview

The Aquifer Images extension provides a seamless interface for discovering and using biblical images within the Theia IDE. It allows users to browse images by book or search for specific content, with a responsive and intuitive user interface.

## Features

### Image Browsing
- Browse images by Bible book (all 66 books of the Bible supported)
- View image thumbnails with descriptive captions
- Click on images to view full-size and embed in documents

### Search Functionality
- Search for images using natural language queries
- Minimum 3-character search requirement for optimal results
- Highlighted search terms in results for easy identification

### Pagination
- Navigate through large sets of images with intuitive pagination controls
- Clear indication of current page, total pages, and total images
- Responsive design that adapts to the Theia theme

### User Experience
- Toggle between book selection and search modes
- Responsive grid layout for image thumbnails
- Theia-themed UI components for consistent experience
- Informative error messages and loading states

## Configuration

The extension requires an API key for the Aquifer Bible Resources API. This can be configured in a `.env` file in the `<app-root>/applications/browser` directory with the following format:

```
AQUIFER_API_KEY=your_api_key_here
AQUIFER_API_URL=https://api.aquifer.bible
```

## Technical Implementation

- Built with React and TypeScript
- Follows Theia extension patterns
- Uses environment configuration service for API access
- Features responsive pagination with dynamic API integration

## Usage

1. Open the Aquifer Images panel from the View menu or by pressing `Ctrl+Alt+a` (or `Ctl+Opt+a` on macOS)
2. Select a Bible book from the dropdown or toggle to search mode
3. Browse through available images or enter search terms
4. Navigate through pages using the pagination controls
5. Click on an image to view full-size and use in your document


## Improvements

- Implement debounced search for performance optimization
- Add image download functionality so users can save images to their local machine
- Access editor preferences to use localization or add a user-defined language
- Interact with the bible selector to access the current Book, Chapter, and Verse