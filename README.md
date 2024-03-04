# Travel Snap App

## Description
Travel Snap App is an application where users can share their travel experiences and other moments by uploading and organizing their photos into albums. Whether it's capturing breathtaking landscapes, delicious local cuisine, or memorable encounters, Travel Snap App allows users to manage their adventures in one place.

# Tech Stack

## Frontend

- **React Native**: React Native is a JavaScript framework for building native mobile applications. It allows developers to write mobile applications using React and JavaScript while still producing native code for iOS and Android platforms.
  
- **Expo**: Expo is an open-source platform for building React Native applications. It provides a set of tools and services that simplify the development and deployment process, such as hot reloading, debugging, and over-the-air updates.

## Backend

- **Spring Boot**: Spring Boot is a Java framework for building enterprise-level applications. It provides a comprehensive infrastructure for developing Java-based applications quickly and efficiently, with features such as auto-configuration, embedded servers, and production-ready metrics.

## Database

- **PostgreSQL**: PostgreSQL is a powerful open-source relational database management system. It offers advanced features such as ACID compliance, full-text search, JSON support, and extensibility. In your project, PostgreSQL is containerized using Docker, which allows for easy deployment and management of the database within a containerized environment.

## Cloud Storage

- **AWS S3 Bucket**: Amazon Simple Storage Service (S3) is an object storage service offered by Amazon Web Services (AWS). It provides a simple web services interface that allows users to store and retrieve data from anywhere on the web. In your project, AWS S3 is used for storing uploaded files, such as images, securely and reliably.

## Other Technologies

- **Docker**: Docker is a platform for developing, shipping, and running applications in containers. It provides a lightweight and portable environment for deploying applications, allowing for consistent deployment across different environments and simplifying the management of dependencies and infrastructure.

# Features

1. **User Authentication and Registration**:
   - Users can sign up and log in using their email and password credentials. JWT tokens are generated upon successful authentication, and users can securely access the application's features with their tokens.

2. **Create New Post**:
   - Users can create new posts by capturing photos using the device's camera and adding optional location information. The app utilizes the device's location services to tag posts with the current location.

3. **Update/Delete Post**:
   - Users can update or delete their existing posts. This functionality allows users to modify the content of their posts or remove them entirely from the app.

4. **New Album**:
   - Users can create new albums to organize their posts efficiently. This feature enables users to categorize and manage their memories according to their preferences.

5. **Logout**:
   - Users can securely log out of their accounts to terminate their session and protect their privacy.

# Native Features

1. **Auto-Locate**:
   - Users can utilize the auto-locate functionality on both iOS and Android devices (as well as supported web browsers). The Geolocation Capacitor plugin is used to implement this feature, allowing users to automatically determine their current location when creating a new post.

2. **Camera**:
   - When creating a travel post, users can seamlessly open their device's camera. This photo will be displayed alongside the created destination, enhancing the visual experience and providing context to the user's travel experiences.


# Domain

![alt text](travel_snap_class_diagram.jpg)

# Screens

![alt text](login.PNG)![alt text](signup.PNG)![alt text](home-page.PNG)
![alt text](drawer.PNG)![alt text](post.PNG)![alt text](albums.PNG)
![alt text](new-post.PNG)![alt text](new-album.PNG)