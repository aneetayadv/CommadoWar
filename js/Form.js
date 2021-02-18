class Form{
    constructor(){
       this.input = createInput("Name");
       this.button = createButton('Play');
       this.greeting = createElement('h2');
       this.title = createElement('h2');
       this.reset = createButton('Reset');
    }

    hideForm() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }

    display(){
        var title = createElement('h2')
        title.html("Commando War");
        title.position(width/2-130, 0);
    
        this.input.position(width/2 -40, height/2 -80);
        this.button.position(width/2 + 30, height/2); 
        this.reset.position(width-100,40); 

        this.button.mousePressed(()=>{
          this.input.hide();
          this.button.hide();
          player.name = this.input.value();
          playerCount+=1;
          player.index = playerCount;
          player.update(); 
          player.updateCount(playerCount);
          this.greeting.html("Hello " + player.name)
          this.greeting.position(width/2 - 70, height/4); 
        });

        this.reset.mousePressed(()=>{
          database.ref('/').update({
            playerCount: 0,
            gameState : 0,
            finishedPlayers : 0,
            players : null
          });
        })
    
      }
}