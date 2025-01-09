# AT-Gen Image Editor

This image editor provides a variety of tools for manipulating images, including crop, rotate, resize, masking, filters, and AI-powered image generation. It offers a user-friendly interface with live previews for adjustments and even allows editing of AI-generated images.

## Features

### 1. **Resize**

- Users can input custom height and width to resize the image.
- Aspect ratios available: **1:1**, **3:4**, **16:9**.
- Live preview of the resized image.
- **Canvas** is used to perform resizing and other image manipulations.

### 2. **Crop**

- Allows users to crop the image by selecting a portion of the image.
- You can move and resize the crop box.
- **Canvas** is used for cropping operations.

### 3. **Rotate**

- Rotate the image to any angle.

### 4. **Mask**

- Three types of masks:
  - **Freehand**
  - **Rectangle**
  - **Circle**
- Adjustable opacity and mask color.
- **Canvas** is used to apply the mask on the image, allowing fine control.

### 5. **Filter**

- Apply filters to the image with live preview.
- Adjustments include:
  - **Saturation**
  - **Brightness**
  - **Contrast**
  - **Filter theme**

### 6. **AI Image Search & Editing**

Note: AI Image Search & Editing is only a simulation feature.

- You can generate images using AI or enhance image using AI, and then perform all the image editing tools (resize, crop, rotate, mask, filter) on the AI-generated image.
- The integration allows users to seamlessly apply transformations to AI-created visuals.

## 7. **Undo-Redo**

- You can undo and redo the every image state using ctrl + z and ctrl + y or command + z and command + y.

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>

   ```

2. Navigate to the project directory:

   ```bash
   cd  <project-directory>

   ```

3. Install the dependencies:

```bash
npm install
```

3. Start Server:

```bash
npm start
```

Your application will be available at http://localhost:3000.

### Design & Implementation Choices\*\*

- State Management: Zustand has been used for state management to handle the image state and editing options efficiently across components.
- UI Components: Tailwind CSS is used for styling, providing a responsive and clean user interface.
- Image Manipulation: Libraries like cropperjs are used for crop and rotate functionalities, and Canvas is leveraged for resizing and masking.
- AI Integration: The AI-powered image search allows users to generate images that can be edited with the same set of tools available for uploaded images.
- Undo & Redo : Zustand has been used for undo redo to make a history of execution .
