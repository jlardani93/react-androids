import React from 'react'
import { connect } from 'react-redux'

class Game extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      kills: 0
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    let animationCounter = 0;
    let spawnSpeed = 120;
    const c_width = window.innerWidth - 300;
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const colorArray = ['red', 'blue', 'pink', 'green', 'yellow', 'purple', 'orange']
    const outlines = []
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
    const checkPlayerCollision = function(){
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        const changeInX = player.x - circle.x;
        const changeInY = player.y - circle.y;
        const distance = Math.sqrt((changeInX * changeInX) + (changeInY * changeInY));
        if (distance <= (player.radius + circle.radius)){
          circles.splice(i, 1);
          player.radius -= 10;
        }
      }
    }
    //OUTLINE METHODS
    const createOutline = function(){
      const x = Math.floor(Math.random()*c_width);
      const y = Math.floor(Math.random()*c_width);
      const radius = 25;
      const fillStyle = colorArray[Math.floor(Math.random()*colorArray.length)]
      outlines.push({
        x: x,
        y: y,
        radius: radius,
        fillStyle: fillStyle,
        creationTime: Date.now()
      })
      console.log("outlines:", outlines)
    }

    const drawOutline = function(outline){
      ctx.beginPath();
      ctx.arc(outline.x, outline.y, outline.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = outline.fillStyle;
      ctx.strokeStyle = outline.fillStyle;
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.closePath();
    }

    const updateOutlines = function(){
      for (let i = 0; i < outlines.length; i++) {
        if (Date.now() - outlines[i].creationTime > 1000){
          createCircle(outlines[i].x, outlines[i].y, outlines[i].fillStyle)
          outlines.splice(i, 1);
        }
      }
    }

    //CIRCLE METHODS
    const createCircle = function(xInput, yInput, fillStyleInput){
      const x = xInput
      const y = yInput
      const radius = 25
      const fillStyle = fillStyleInput
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
      if (circle.x - player.x > 0) {
        sin *= -1;
        cos *= -1;
      }
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

    const checkProjectileCollision = (projectile, projectileIndex) => {
      const circlesToDelete = []
      for (let i = 0; i < circles.length; i++){
        let circle = circles[i];
        if ((projectile.x < circle.x+circle.radius)
         && (projectile.x > circle.x-circle.radius)
         && (projectile.y < circle.y+circle.radius)
         && (projectile.y > circle.y-circle.radius)) {
           projectiles.splice(projectileIndex, 1);
           circle.radius -= 25;
           if (circle.radius <= 0) {
             circlesToDelete.push(i);
             this.setState({kills: this.state.kills+1})
             player.radius += 3;
           }
         }
      }
      // for (let i = 0; i < projectilesToDelete.length; i++){
      //   delete projectilesToDelete[i];
      // }
      circlesToDelete.forEach(index =>  circles.splice(index, 1));
    }

    const animate = () => {
      ctx.clearRect(0, 0, c_width, c_width);
      animationCounter += 1;
      outlines.forEach(outline => drawOutline(outline));
      circles.forEach(circle => drawCircle(circle));
      circles.forEach(circle => growCircle(circle))
      if (animationCounter % spawnSpeed === 0) {
        createOutline();
      }
      if (Date.now() - player.velocity[2] > 500) {
        setPlayerVelocity(0, 0);
      }
      drawPlayer();
      for (let i = 0; i < projectiles.length; i++) {
        checkProjectileCollision(projectiles[i], i);
      }
      checkPlayerCollision();
      movePlayer();
      circles.forEach(circle => {
        setCircleVelocity(circle);
        moveCircle(circle);
      })
      projectiles.forEach(projectile => drawProjectile(projectile));
      projectiles.forEach(projectile => moveProjectile(projectile));
      updateOutlines(); 
      if (animationCounter % 150 === 0) {
        spawnSpeed -= 1;
        console.log("spawnspeed: " + spawnSpeed);
      }
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
          <h3>Kills: {this.state.kills}</h3>
          <div>
            <canvas id="gameCanvas"></canvas>
          </div>
        </div>
      </div>

    )
  }
}

export default connect()(Game)
