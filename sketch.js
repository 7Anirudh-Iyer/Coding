var write,sub,elm
var gS=0
var pC=0
var s
var db
var rese
var b
var blah = 0
ar = []
var p1,p2,p3,p4,p5,p6,p7

function setup(){

    canvas = createCanvas(windowWidth,windowHeight)

    db=firebase.database()

    w=windowWidth
    h=windowHeight

    p1=createSprite(w/2-w/8,h/3,30,30)
    p1.visible=false

    p2=createSprite(w/2-w/8,h/2,30,30)
    p2.visible=false
    
    p3=createSprite(w/2-w/8,h/1.5,30,30)
    p3.visible=false
    
    p4=createSprite(w/2+w/8,h/3,30,30)
    p4.visible=false
    
    p5=createSprite(w/2+w/8,h/2,30,30)
    p5.visible=false
    
    p6=createSprite(w/2+w/8,h/1.5,30,30)
    p6.visible=false
    
    p7=createSprite(w/2,h/4,30,30)
    p7.visible=false
    

    write=createInput(' ')
    write.position(w/2-write.width/2,h/3.5)

    sub=createButton('Submit')
    sub.position(w/2-sub.width/2,h/2.5)

    rese=createButton('Reset')
    rese.position(w/2-rese.width/2,h/1.5)

    ar = [p1,p2,p3,p4,p5,p6,p7]

    db.ref('gS').on('value',function(data){
        va=data.val()
        gS=va
    })

    db.ref('pC').on('value',function(data){
        vari=data.val()
        pC=vari
    })
     
}

function draw(){

    db.ref('/').update({
        gS: gS,
    })

    if(gS==0){
        background(0,0,300)
        sub.mousePressed(work)
    }

    rese.mousePressed(reset)

    if(pC==7){
        gS=1
    }

    if(gS==1){
        background(0)
        write.hide()
        sub.hide()
        t.hide()

        p1.visible=true
        p2.visible=true
        p3.visible=true
        p4.visible=true
        p5.visible=true
        p6.visible=true
        p7.visible=true


    }

    if(gS==1){

        let x = 300
        let index = 0 
    
        for(var i in b){
          ar[index].x = x
          x+=200
          ar[index].y=b[i].y
    
          if(blah-1==index){
             camera.position.y=ar[blah-1].y
          }
          index++
        }
        
        if(keyDown('up')){
         ar[blah-1].y -= 20
         db.ref('players/player'+blah).update({
           y: ar[blah-1].y
         })
        }
    
        drawSprites()
      }
    
    drawSprites();
}


function reset(){
    db.ref('/').update({
        gS: 0,
        pC: 0,
        players: null,
    })
}

function work(){
    b=write.value()
    t=createElement('h4')
    t.position(w/2-w/8,h/2)
    t.html('Welcome '+b+'. We are waiting for other players.')

    pC+=1

    db.ref('/').update({
        pC: pC
    })

    db.ref('players/player'+pC).set({
        y: 508,
        pln: pC
      })
}