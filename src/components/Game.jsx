import React from 'react'
import { connect } from 'react-redux'

class Game extends React.Component{



  componentDidMount(){
    let animationCounter = 0;
    const c_width = window.innerWidth - 300;
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const colorArray = ['red', 'blue', 'pink', 'green', 'yellow', 'purple', 'orange']
    const circles = []
    const projectiles = []
    const player = {
      x: c_width/2,
      y: c_width/2,
      radius: 50,
      velocity: [0, 0, null],
      previousVelocity: [0, 0, null]
    }
    //circle object: {x, y, radius, fillStyle}
    const createCanvas = function(){
      canvas.width = c_width;
      canvas.height = c_width;
    }

    //PLAYER METHODS
    const drawPlayer = function(){
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();
    }
    const setPlayerVelocity = function(x, y, timestamp){
      player.previousVelocity = player.velocity;
      console.log(Date.now());
      player.velocity = [x, y, timestamp]
    }
    const movePlayer = function(){
      player.x += player.velocity[0];
      player.y += player.velocity[1];
    }

    //CIRCLE METHODS
    const createCircle = function(){
      const x = Math.floor(Math.random()*c_width);
      const y = Math.floor(Math.random()*c_width);
      const radius = 25;
      const fillStyle = colorArray[Math.floor(Math.random()*colorArray.length)]
      circles.push({
        x: x,
        y: y,
        radius: radius,
        fillStyle: fillStyle
      })
    }
    const drawCircle = function(circle){
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = circle.fillStyle;
      ctx.fill();
      ctx.closePath();
    }
    const growCircle = function(circle){
      circle.radius += 0.1;
    }
    const setCircleVelocity = function(circle){
      const changeInX = circle.x - player.x;
      const changeInY = circle.y - player.y;
      const distance = Math.sqrt((changeInX * changeInX) + (changeInY * changeInY));
      const slope = changeInY / changeInX;
      const angle = Math.atan(slope);
      let cos = Math.cos(angle);
      let sin = Math.sin(angle);
      if (animationCounter % 120 === 0){
        const data = {
          changeInX,
          changeInY,
          distance,
          slope,
          angle,
          cos,
          sin
        }
        console.log(data);
      }
      if (circle.x - player.x > 0) {
        sin *= -1;
        cos *= -1;
      }
      // if (circle.y - player.y < 0) cos *= -1;

      circle['velocity'] = [cos, sin];
    }

    const moveCircle = function(circle){
      circle.x += circle.velocity[0];
      circle.y += circle.velocity[1];
    }

    //PROJECTILE METHODS

    const createProjectile = function(x, y, velocity){
      projectiles.push({
        x: x,
        y: y,
        radius: 10,
        velocity: velocity
      })
    }

    const drawProjectile = function(projectile){
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();
    }

    const moveProjectile = function(projectile){
      projectile.x += projectile.velocity[0];
      projectile.y += projectile.velocity[1];

      if (projectile.x > c_width || projectile.x < 0 || projectile.y > c_width || projectile.y < 0) {
        // delete projectile;
      }
    }

    const checkProjectileCollision = function(projectile){
      circles.forEach(circle => {
        
      })
    }

    const animate = function(){
      ctx.clearRect(0, 0, c_width, c_width);
      animationCounter += 1;
      circles.forEach(circle => drawCircle(circle));
      circles.forEach(circle => growCircle(circle))
      if (animationCounter % 300 === 0) {
        createCircle();
      }
      if (Date.now() - player.velocity[2] > 500) {
        setPlayerVelocity(0, 0);
      }
      drawPlayer();
      movePlayer();
      circles.forEach(circle => {
        setCircleVelocity(circle);
        moveCircle(circle);
      })
      projectiles.forEach(projectile => drawProjectile(projectile));
      projectiles.forEach(projectile => moveProjectile(projectile));
      requestAnimationFrame(animate);
    }

    window.onkeydown = (event) => {
      switch (event.code){
        case 'KeyJ':
          createProjectile(player.x - player.radius, player.y, [-3, 0]);
          break;
        case 'KeyI':
          createProjectile(player.x, player.y - player.radius, [0, -3]);
          break;
        case 'KeyL':
          createProjectile(player.x + player.radius, player.y, [3, 0]);
          break;
        case 'KeyK':
          createProjectile(player.x, player.y + player.radius, [0, 3]);
          break;
        case 'KeyA':
          setPlayerVelocity(-5, 0, Date.now());
          break;
        case 'KeyW':
          setPlayerVelocity(0, -5, Date.now());
          break;
        case 'KeyD':
          setPlayerVelocity(5, 0, Date.now());
          break;
        case 'KeyS':
          setPlayerVelocity(0, 5, Date.now());
          break;
      }
    }

    window.onkeyup = (event) => {
      if (Date.now() - player.velocity[2] > 500){
        setPlayerVelocity(0, 0, Date.now());
      }
    }



    createCanvas();
    animate();


  }

  render(){
    return(
      <div className="gameContainer">
        <style jsx>{`
          canvas {
            border: 1px solid black;
          }

          .gameContainer {
            display: flex;
            justify-content: center;
            text-align: center;
          }

        `}
        </style>
        <div>
          <h3>Game Component</h3>
          <div>
            <canvas id="gameCanvas"></canvas>
          </div>
        </div>
      </div>

    )
  }
}

export default connect()(Game)
