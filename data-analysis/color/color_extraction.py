import logging
from PIL import Image
import numpy as np
from collections import Counter
import webcolors

logger = logging.getLogger(__name__)


class ColorExtraction:
    @staticmethod
    def detect_colors(image_file):
        image = Image.open(image_file)
        image_rgb = image.convert('RGB')

        # Resize the image to a smaller size for faster processing
        image_rgb.thumbnail((200, 200))

        image_array = np.array(image_rgb)

        # Flatten the 2D array into a 1D array
        pixels = image_array.reshape(-1, 3)

        color_counter = Counter(map(tuple, pixels))
        dominant_colors = color_counter.most_common(2)

        # Convert RGB tuples to color names
        dominant_colors_names = [ColorExtraction.closest_color(color[:3]) for color, count in dominant_colors]

        logger.info('Extracted dominant colors from image')

        return dominant_colors_names

    @staticmethod
    def closest_color(rgb_tuple):
        min_colors = {}
        for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
            r_c, g_c, b_c = webcolors.hex_to_rgb(key)
            rd = (r_c - rgb_tuple[0]) ** 2
            gd = (g_c - rgb_tuple[1]) ** 2
            bd = (b_c - rgb_tuple[2]) ** 2
            min_colors[(rd + gd + bd)] = name
        return min_colors[min(min_colors.keys())]
