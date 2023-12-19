const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const geolib = require("geolib");
const io = socketIO(server);
const drivers = new Map();
const riders = new Map();
const rideRequests = new Map();

io.on("connection", (socket) => {
  console.log("A user connected ");

  socket.on("myLocation", (data) => {
    if (data.userRole == "driver") {
      drivers.set(data.uid, {
        latitude: data?.location?.latitude,
        longitude: data?.location?.longitude,
        userRole: data?.userRole,
        socketId: socket.id,
        rideStatus: data?.rideStatus,
      });
    } else {
      riders.set(data.uid, {
        latitude: data?.location?.latitude,
        longitude: data?.location?.longitude,
        userRole: data?.userRole,
        socketId: socket.id,
      });
    }

    for (var [riderKey, riderValue] of riders.entries()) {
      for (var [driverKey, driverValue] of drivers.entries()) {
        if (
          geolib.isPointWithinRadius(
            {
              latitude: drivers?.get(driverKey)?.latitude,
              longitude: drivers?.get(driverKey)?.longitude,
            },
            {
              latitude: riders?.get(riderKey)?.latitude,
              longitude: riders?.get(riderKey)?.longitude,
            },
            2000
          ) &&
          drivers.get(driverKey).rideStatus == "free"
        ) {
          io.to(riders.get(riderKey).socketId).emit("driverLocation", {
            latitude: drivers.get(driverKey).latitude,
            longitude: drivers.get(driverKey).longitude,
            driverUid: driverKey,
          });
        }
      }
    }
  });

  socket.on("requestRide", (data) => {
    const { riderUid, location, origin, destination } = data;
    for (var [key, value] of drivers.entries()) {
      if (
        geolib.isPointWithinRadius(
          { latitude: value.latitude, longitude: value.longitude },
          {
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
          },
          1000
        ) &&
        value.rideStatus == "free"
      ) {
        io.to(value.socketId).emit("getRideRequest", {
          riderUid,
          origin,
          destination,
          location,
        });
      } else if (
        geolib.getDistance(
          { latitude: value.latitude, longitude: value.longitude },
          { latitude: location.latitude, longitude: location.longitude }
        ) <= 3000
      ) {
        io.to(value.socketId).emit("allRequests", {
          riderUid,
          origin,
          destination,
          location,
        });
      }
    }
  });

  socket.on("acceptRide", (data) => {
    const rider = riders.get(data.riderUid);
    io.to(rider.socketId).emit("rideRequestAccepted", data);
  });

  socket.on("startRouting", (data) => {
    const rider = riders.get(data.riderUid);
    io.to(rider.socketId).emit("showRouting", data);
  });
  socket.on("disconnect", () => {
    console.log("A user Disconnected");
  });
});

server.listen(5000, () => {
  console.log("server started on port 5000");
});
