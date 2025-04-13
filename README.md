# 3D Satellite Information Dashboard

The purpose of this project is to combine React with my Linux Ubuntu Server that I love greatly to combine aspects of my Aerospace Engineering minor and Software Engineering major

The goal is to create an Interactive 3D globe of the Earth and multiple satellites that direct you to the webpage of that service hosted on my ubuntu server
 - Because of the way my home network is configured port forwarding is not possible which lead me to using Tailscale to connect to my server. It was very easy and useful because it tricked the devices into thinking they are on the same network which worked great however, this means that anyone outside my tailscale network (tailnet) cannot access my services. Which is what this project strives to fix. We will use tailscale funnel and serve to allow outside traffic into my tailnet and use a fancy React app to allow people access to these services. 

For this project I will be using React + Vite
 - Three.js is used to render 3D models 
 - Tailwind CSS will be used because better styling
 - React because I have the most experience with it the goal is to make the UI with this
    - Vite is a tool for faster React app development because it reloads only the changes it needs to instead of rebuilding everything


For development purposes on a local instance of the project use:
```npm run dev```