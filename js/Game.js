class Game{
    constructor(){

    }
    getState() {
        database.ref('gameState').on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
       // console.log(gameState);
    }

    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
            player1 = createSprite(width-100,height-50);
            player1.addAnimation("commando1",commando_Img1);
   
            player2 = createSprite(100,height-50);
            player2.addAnimation("commando2",commando_Img2);
            players=[player1,player2];
        }

        play(){
            form.hideForm();
            Player.getPlayerInfo();
            this.getState();

            var x;
            var y=height-100;
            if(allPlayers != undefined){

                image(back_Img, 0, 0, width, height);

                var index = 0;
               // var x;
               // var y=height-100;

                for(var plr in allPlayers){
                    index = index + 1;
                   // x = width/2-allPlayers[plr].distance;

                   if(index === 1){
                        x = width-100-allPlayers[plr].distance;
                   }
                   else if(index === 2){
                        x = 100-allPlayers[plr].distance;
                   }
                               
                    players[index -1].x = x;
                    players[index - 1].y = y;
                       
                    if(index === player.index){
                        fill("red");      
                    }
                    else    
                        fill("black");
                    textSize(20);             
                    textAlign(CENTER);
                    text(allPlayers[plr].name,players[index-1].x,players[index-1].y-100);

                   // console.log("Position X : "+ players[index -1].position.x);

                  
                }
            }

            if(player.index !== null){

                //Move Players
               if (keyDown(RIGHT_ARROW)) {
                    player.distance -= 10
                    player.index == 1? player.posX = players[0].position.x:player.posX = players[1].position.x ;
                    player.index == 1? player.posY = players[0].position.y:player.posY = players[1].position.y ;
                    player.update();
                }
                if (keyDown(LEFT_ARROW)) {
                    player.distance += 10;
                    player.index == 1? player.posX = players[0].position.x:player.posX = players[1].position.x ;
                    player.index == 1? player.posY = players[0].position.y:player.posY = players[1].position.y ;
                   // player.posX = players[index -1].position.x;
                   // player.posY = players[index -1].position.y;
                    player.update();
                }
                
                //Fire Bullets
                var x1,x2,y1,y2;
                if(keyDown("space") ){
                   /* fire = createSprite(width-200,height-130);
                    fire.addImage("bullet",fire_Img);
                    fire.lifetime = 400;
                    
                    fireGrp.add(fire);
                    if(player.index ===1){
                        fire.x = players[0].position.x;
                        fire.y = players[0].position.y;
                        fire.velocityX = -3;
                        if(fireGrp.isTouching(player2))
                        {
                            console.log("player1 wins!!");
                            this.update(2);
                            player.rank +=1;
                            player.update();
                        }
                    }
                    else{
                        fire.x = players[1].position.x;
                        fire.y = players[1].position.y;
                        fire.velocityX = 3;
                        if(fireGrp.isTouching(player1))
                        {
                            console.log("player2 wins!!");
                            this.update(2);
                            player.rank +=1;
                            player.update();
                           // gameOver = true;
                        }
                    }*/
                   

                    

                    if(player.index === 1)
                    {
                        
                        fire = createSprite(width-200,height-130);
                        fire.x = player1.x + fire.width/2;
                        fire.y = player1.y-20;
                        fire.addImage("bullet",fire_Img);
                        fire.lifetime = 400;
                        fire.velocityX = -3;
                        fireGrp.add(fire);

                        if(fireGrp.isTouching(player2))
                        {
                            console.log("player1 wins!!");
                            this.update(2);
                            player.rank +=1;
                            player.update();
                           // gameState = 2;
                        }
                    }
                    else if(player.index === 2){
                        fire = createSprite(175,height-130);
                        fire.x = player2.x + fire.width/2;
                        fire.y = player2.y-20;
                        fire.addImage("bullet",fire_Img);
                        fire.lifetime = 400;
                        fire.velocityX = 3;
                        fireGrp.add(fire);

                        if(fireGrp.isTouching(player1))
                        {
                            console.log("player2 wins!!");
                            this.update(2);
                            player.rank +=1;
                            player.update();
                           // gameOver = true;
                        }
                    } 
                }
            }
           
            text(mouseX +"," +mouseY,mouseX,mouseY);
            drawSprites();
             
        }
    
        end(){
           console.log("Game Ended");
           imageMode(CENTER);
            Player.getPlayerInfo();

             textAlign(CENTER);
             textSize(50);
           
            for(var plr in allPlayers){                
                if(allPlayers[plr].rank === 1){
                    if(player.index === 1){   
                        text("Player 1 Wins!! ",width/2,height/2);                
                        image(player1_standImg,allPlayers[plr].posX, allPlayers[plr].posY);
                        image(player2_dieImg, allPlayers[plr].posX, allPlayers[plr].posY);
                    }
                    else if(player.index === 2){   
                        text("Player 2 Wins!! ",width/2,height/2);   
                        image(player2_standImg, allPlayers[plr].posX, allPlayers[plr].posY);
                        image(player1_dieImg, allPlayers[plr].posX, allPlayers[plr].posY);
                    }
                }
            }
        }     
    }