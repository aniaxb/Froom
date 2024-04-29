import logging
from rembg import remove
import os
from datetime import datetime

logger = logging.getLogger(__name__)


async def remove_background(image_file):

    image_data = image_file.read()

    image_data_out = remove(image_data)

    logger.info('Background removed successfully')

    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    output_image_path = f'rb_output_{timestamp}.jpg'

    with open(output_image_path, 'wb') as f_out:
        f_out.write(image_data_out)

    if os.path.exists(output_image_path):
        return {'message': 'Background removed successfully', 'output_image': output_image_path}
    else:
        return {'error': 'Failed to save the output image file'}
