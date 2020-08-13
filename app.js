function gameInit() {

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
            return ;

        console.log('we are taking off');

        TRexFlyingStatus = true;  // we're ready to take off :P
        let TRexImage = document.getElementById('TRex-image');
        TRexImage.style.bottom = '0';

        let vy = 17;  // these numbers are set by testing
        let acceleration = -1.1;

        let interval = setInterval(function () {
            TRexImage.style.bottom = (getElementPosition(TRexImage, 'bottom') + vy).toString() + 'px';
            vy = vy + acceleration;

            if(getElementPosition(TRexImage, 'bottom') < 0){
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
}

window.addEventListener('load', gameInit);