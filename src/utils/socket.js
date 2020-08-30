import io from 'socket.io-client';


function subscribeToTimer(cb) {

        // socket initialization here
        var user = JSON.parse(localStorage.getItem("user"))
        var userId = user.id
        const socket = io(`http://localhost:5000`, { query: `userId=${userId}` });

  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };