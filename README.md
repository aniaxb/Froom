# Froom - web application for managing user's virtual wardrobe

<p align="center">
   <img src="https://github.com/aniaxb/Froom/assets/101459177/1b97f2e0-f52f-4136-bdcb-432b6cda18dc" alt="Froom logo" width="400" />
</p>

## Project Structure
1. Frontend
2. Backend
3. Data Analysis
4. Diagrams - made for engineering thesis with **PlantUML**

## Purpose
**Froom** is a web application for virtual wardrobe management. It has many functions available:

- Adding new clothes (supported by [data-analysis](https://github.com/aniaxb/Froom/tree/main/data-analysis) - extracting colors and detecting shape of clothing from an image)
- Editing and removing clothes from the wardrobe
- Filtering clothes inside the wardrobe
- Outfit creator
- Random outfit generator
- Outfit duplicator
- Editing and deleting outfits

## Prerequisities

- Docker - version 20.10.x and higher
- Docker Compose version 3.8. or higher

## Installation
To build containers in Docker run command below:
```
docker-compose build
```
To run created containers use command:
```
docker-compose up
```

## Browsing the app
Having successfully started the containsers, in order to browse the app, simply access this url:
(http://127.0.0.1:5173/)

## User's manual (screenshots from the app)
<p align="center">
  <img src="https://github.com/user-attachments/assets/d098c3f1-78e8-43f6-a183-dbddd493dcf4" alt="Landing page" width="600" />
  <img src="https://github.com/user-attachments/assets/b2ea9823-fab4-4fa7-9a02-29dec34635f8" alt="Landing page cd." width="600" />
  <img src="https://github.com/user-attachments/assets/aeeb8b69-b089-423f-8a73-329b55e8b0f5" alt="Landing page cd." width="600" />
  <img src="https://github.com/user-attachments/assets/03000526-fa8f-4919-b2ee-c72ff78c7118" alt="About page" width="600" />
  <img src="https://github.com/user-attachments/assets/98fecfb0-05b9-4807-a885-d22680b71e94" alt="About page cd." width="600" />
  <img src="https://github.com/user-attachments/assets/66846180-192d-4142-96b0-a648dc4f158a" alt="Contact page" width="600" />
  <img src="https://github.com/user-attachments/assets/be468499-3dc5-46e9-bef1-0b7ece827604" alt="Register page" width="600" />
  <img src="https://github.com/user-attachments/assets/0c8cfe7b-5e34-4078-9a27-8b91e94865aa" alt="Login page" width="600" />
  <img src="https://github.com/user-attachments/assets/2027e0db-9352-45bb-9bc5-56e88fb0004b" alt="Wardrobe page" width="600" />
  <img src="https://github.com/user-attachments/assets/36beec99-c66d-4167-a2f5-9edfae24f047" alt="Add new item view" width="600" />
  <img src="https://github.com/user-attachments/assets/b11e824a-eeae-45d8-afd4-313d3f82d434" alt="Update item view" width="600" />
  <img src="https://github.com/user-attachments/assets/2fc1b09e-40de-401d-a787-4fb840aaee83" alt="Outfits view" width="600" />
  <img src="https://github.com/user-attachments/assets/a714ee4c-53a5-47e8-a545-d2aa3aa3b978" alt="Add new outfit view" width="600" />
  <img src="https://github.com/user-attachments/assets/1d7212df-1982-4832-bb48-264f208ba423" alt="Edit outfit view" width="600" />
  <img src="https://github.com/user-attachments/assets/d190cb0c-d1ab-4a7b-aae4-adfef633396f" alt="Filtering" width="600" />
  <img src="https://github.com/user-attachments/assets/42e40803-6902-4312-982b-e7b908b42fe5" alt="Profile view" width="600" />
  <img src="https://github.com/user-attachments/assets/07bf4f34-9e56-48f2-85b1-35d767ad4460" alt="Change password view" width="600" />
</p>
