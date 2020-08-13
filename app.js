function gameInit() {

    const initialVelocityY = 17;  // these numbers are set by testing, with vy=17 and acceleration=-1.1 the maximum height will be around 131 pixels
    const acceleration = -1.1;


    const obstacleVelocity = -2.5;

    const minObstacleHeight = 30;
    const maxObstacleHeight = 80;

    let gameFrameDiv = document.getElementById('game-frame');

    let createObstacleInterval;
    let moveObstacleInterval; // this is used in moveAllObstacles function.
    // This is Interval that moves all of the obstacles every couple of seconds


    function startGame() { // this function will start the game (starts new game to play again after losing)
        // and we will call this function at the very end of the 'gameInit' function
        const obstacleCreationTime = 2000; // 2000 ns, this indicates how fast an obstacle get shown on the game
        createObstacleInterval = setInterval(createObstacle, obstacleCreationTime);

        moveObstacleInterval = setInterval(moveAllObstacles, 10);
    }


    function moveAllObstacles() {
        let allObstacles = document.querySelectorAll('.obstacle');
        for (let i = 0; i < allObstacles.length; i++) {
            let id = allObstacles[i].getAttribute('id');
            let obstacleElement = document.getElementById(id);
            obstacleElement.style.left = (getElementPosition(obstacleElement, 'left') + 2 * obstacleVelocity).toString() + 'px';
            // we use '2*obstacleVelocity' since we don't want to enlarge the obstacles too much but we want to obstacles to be faster
            // we use obstacleVelocity to calculate maximum of obstacle width when we random its width

            if (getElementPosition(obstacleElement, 'left') < -200) {// 200 is a reasonable amount for deleting the obstacle when it goes out of the game frame
                gameFrameDiv.removeChild(obstacleElement);
            }

        }
    }

    let obstacleCount = 0; // This variable will keep track of the number of obstacles that were created so far.
    // This will be used as ID of very obstacle
    // ex. The first obstacle has the id of '0'
    function createObstacle() {

        let obstacle = document.createElement('div');
        obstacle.classList.add('game-object');
        obstacle.classList.add('obstacle');

        obstacle.id = obstacleCount.toString();
        obstacleCount++;

        let obstacleHeight = Math.floor(Math.random() * 60) + 20; // generates random integer between 20 and 80
        let obstacleWidth = Math.floor(Math.random() * (calcMaxObstacleWidth(obstacleHeight) - 40) + 20); // to make sure the obstacle has some width

        let gameFrameDivWidth = gameFrameDiv.style.width = '1000px';
        console.log(gameFrameDivWidth);

        obstacle.style.left = gameFrameDivWidth;
        obstacle.style.width = obstacleWidth.toString() + 'px';
        obstacle.style.height = obstacleHeight.toString() + 'px';


        let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        obstacle.style.backgroundColor = randomColor;
        gameFrameDiv.appendChild(obstacle);
    }

    function calcMaxObstacleWidth(obstacleHeight) { // will calculate how big we can make our obstacle
        // based on Physics calculation stored in assets directory
        return (2 / Math.abs(acceleration)) * Math.sqrt(-2 * acceleration * obstacleHeight +
            initialVelocityY * initialVelocityY) * Math.abs(obstacleVelocity);
    }


    function getElementPosition(element, attribute) {
        if (attribute === 'bottom') {
            return Number(element.style.bottom.replace('px', ''));
        }
        if (attribute === 'left') {
            return Number(element.style.left.replace('px', ''));
        }
    }


    let TRexFlyingStatus = false; // if this is true it means that the TRex is jumping already
    // so we will not jump again in the middle of a jump
    function TRexJump() {
        if (TRexFlyingStatus)
            return;

        console.log('we are taking off');

        TRexFlyingStatus = true;  // we're ready to take off :P
        let TRexImage = document.getElementById('TRex-image');
        TRexImage.style.bottom = '0';

        let vy = initialVelocityY;

        let interval = setInterval(function () {
            TRexImage.style.bottom = (getElementPosition(TRexImage, 'bottom') + vy).toString() + 'px';
            vy = vy + acceleration;

            if (getElementPosition(TRexImage, 'bottom') < 0) {
                TRexImage.style.bottom = '0';  // in case we went under the ground this line will pull us up
                TRexFlyingStatus = false;
                clearInterval(interval);
            }
        }, 18);

    }

    window.addEventListener('keydown', function (event) {
        if (event.code === 'ArrowUp')
            TRexJump();
    })


    startGame();
}

window.addEventListener('load', gameInit);