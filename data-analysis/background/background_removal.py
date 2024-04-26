from rembg import remove


def remove_background(image_file):
    # Read the contents of the image file
    image_data = image_file.read()

    # Perform background removal
    image_data_out = remove(image_data)

    # Write the processed image data to a new file
    with open('rb_output.jpg', 'wb') as f_out:
        f_out.write(image_data_out)

    # Return a message indicating successful background removal
    return {'message': 'Background removed successfully', 'output_image': 'rb_output.jpg'}
