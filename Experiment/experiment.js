/*
Developped By:Rahul Raj

*/
var clock;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 1000;
var leftMirror;
var rightMirror;
var imagesLeft=[];
var imagesRight=[];
var x=0;
var xAnimate1=0;
var xAnimate2=0;
var xAnimate3=0;
var xAnimate4=0;
var mAnimate1;
var mAnimate2;
var mAnimate3;
var mAnimate4;
var cAnimate1;
var cAnimate2;
var cAnimate3;
var cAnimate4;
var posX;
var posY;
var desX;
var speed;
var colour;
var m1;
var c1;
var halfLength;
var imagesFromLeft=[];
var imagesFromRight=[];
var turn=1;
var ray1=[];
var ultimateSpeed=0;
var time=60000;
var f=[];
var counter=0;
var angles=[];
var animationFlag=0;
var animateRay=[];
var t=0;
var mAnimate;
var cAnimate;
var flag1=1;
var flag2=0;
var flag3=0;
var flag4=0;
var flag5=0;
var flag6=0;
var lastOn=0;
var lastOff=1;

//Initialising the scene
function initialiseScene()
{
    f.length=0;
    clock=new THREE.Clock();
    PIEscene.add(new THREE.AmbientLight(0x606060));
    PIEscene.background=new THREE.Color( 0xbfd1e5 );
    PIEsetCameraFOV(45);
    PIEsetCameraAspect(ASPECT);
    PIEsetCameraDepth(FAR);
    PIEadjustCamera(0,0,80);
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff,linewidth:3} );
    var leftGeometry = new THREE.Geometry();
    //halfLength=window.innerHeight/70;
    halfLength=10;
    leftGeometry.vertices.push(new THREE.Vector3( 0, halfLength, 0) );
    leftGeometry.vertices.push(new THREE.Vector3( 0, -halfLength, 0) );
    for(var i=0;i<2*halfLength;i++)
    {
      leftGeometry.vertices.push(new THREE.Vector3( 0, halfLength-i, 0) );
      leftGeometry.vertices.push(new THREE.Vector3(-0.5,halfLength-(i+1),0));
      leftGeometry.vertices.push(new THREE.Vector3( 0, halfLength-i, 0) );
    }
    leftMirror = new THREE.Line( leftGeometry, material );
    PIEaddElement(leftMirror);
    //PIEdragElement(leftMirror);
    //PIEsetDragEnd(leftMirror,rotateMirror);
    var rightGeometry = new THREE.Geometry();
    rightGeometry.vertices.push(new THREE.Vector3( 0, halfLength, 0) );
    rightGeometry.vertices.push(new THREE.Vector3( 0, -halfLength, 0) );
    for(var i=0;i<2*halfLength;i++)
    {
      rightGeometry.vertices.push(new THREE.Vector3( 0, halfLength-i, 0) );
      rightGeometry.vertices.push(new THREE.Vector3(0.5,halfLength-(i+1),0));
      rightGeometry.vertices.push(new THREE.Vector3( 0, halfLength-i, 0) );
    }
    rightMirror=new THREE.Line( rightGeometry, material );
    PIEaddElement(rightMirror);
    //PIEdragElement(rightMirror);
    //PIEsetDragEnd(rightMirror,rotateMirror);

    leftMirror.position.x=-halfLength*Math.cos(45*Math.PI/180);
    leftMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
    leftMirror.rotation.z=45*Math.PI/180;

    rightMirror.position.x=halfLength*Math.cos(45*Math.PI/180);
    rightMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
    rightMirror.rotation.z=-45*Math.PI/180;
    // angleRight=60;
    // rightMirror.position.set(halfLength*Math.cos((90-angleRight)*Math.PI/180),halfLength*Math.sin((90-angleRight)*Math.PI/180),0);

    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    circle = new THREE.Mesh( geometryCircle, materialCircle );
    PIEaddElement( circle );
    circle.position.x=0;
    circle.position.y=5;
    //PIEdragElement(circle);
    setText();
    counter=1;
    PIEcreateTable("Observation Table",6,3, true);
    var headerRow=["S.No.","Angle</br>Between</br>Mirrors","Number</br>of</br>Images Formed"];
    PIEupdateTableRow(0, headerRow);
    PIEupdateTableCell(1, 0, "1.");
    PIEupdateTableCell(1, 1, "90");
    PIEupdateTableCell(1, 2, "3");
    row=document.getElementsByTagName('tr');
    //rowElem=document.getElementsByTagName('td');
    for(var i=1;i<row.length;i++)
    {
      row[i].align='center';
    }

    // rowElem[0].style.border='solid';
    // rowElem[1].style.border='solid';
    // rowElem[2].style.border='solid';
    // head=document.getElementsByTagName('th');
    // head[0].style.border='double';
    // head[1].style.border='double';
    // head[2].style.border='double';
    counter++;
    angles.push(90);
    PIEstartButton.onclick=function()
    {
      if(lastOn==1)
      {
        if(turn==0)
        {
          for(var i=imagesLeft.length-1;i>=0;i--)
          {
            PIEremoveElement(imagesLeft[i]);
            imagesLeft.pop();
          }
          for(var i=imagesRight.length-1;i>=0;i--)
          {
            PIEremoveElement(imagesRight[i]);
            imagesRight.pop();
          }
          leftMirror.position.x=-halfLength*Math.cos(45*Math.PI/180);
          leftMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
          leftMirror.rotation.z=45*Math.PI/180;

          rightMirror.position.x=halfLength*Math.cos(45*Math.PI/180);
          rightMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
          rightMirror.rotation.z=-45*Math.PI/180;

          PIEchangeInputSlider("Angle btw Mirror:",90);
          document.getElementById("hello").innerHTML="<h2></h2>";
          PIErender();
        }
      }
      else
      {
        lastOn=1;
        flag1=1;
        flag2=0;
        flag3=0;
        flag4=0;
        flag5=0;
        flag6=0;
        xAnimate1=0;
        xAnimate2=0;
        xAnimate3=0;
        xAnimate4=0;
        leftMirror.position.x=-halfLength*Math.cos(45*Math.PI/180);
        leftMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
        leftMirror.rotation.z=45*Math.PI/180;

        rightMirror.position.x=halfLength*Math.cos(45*Math.PI/180);
        rightMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
        rightMirror.rotation.z=-45*Math.PI/180;
        for(var i=ray1.length-1;i>=0;i--)
          {
            PIEremoveElement(ray1[i]);
            ray1.pop();
          }
        for(var i=imagesLeft.length-1;i>=0;i--)
        {
          PIEremoveElement(imagesLeft[i]);
          imagesLeft.pop();
        }
        for(var i=imagesRight.length-1;i>=0;i--)
        {
          PIEremoveElement(imagesRight[i]);
          imagesRight.pop();
        }
        for(var i=imagesFromLeft.length-1;i>=0;i--)
        {
          PIEremoveElement(imagesFromLeft[i]);
          imagesFromLeft.pop();
        }
        for(var i=imagesFromRight.length-1;i>=0;i--)
        {
          PIEremoveElement(imagesFromRight[i]);
          imagesFromRight.pop();
        }
        //console.log("hi");
        //console.log(animateRay.length-1);
        for(var i=animateRay.length-1;i>=0;i--)
        {
          PIEremoveElement(animateRay[i]);
          animateRay.pop();
        }
        PIEchangeInputSlider("Angle btw Mirror:",90);
        document.getElementById("hello").innerHTML="<h2></h2>";
        PIErender();
      }
    };
    // PIEstopButton.onclick=function()
    // {
    //   //PIEstopAnimation();
    // };
    //document.getElementById("hello").innerHTML="<h2>Rahul</h2>";
    PIErender();
}

function loadExperimentElements()
{
    PIEsetExperimentTitle("A Multiple images with hinged mirrors");
    PIEsetDeveloperName("Rahul Raj");
    PIEsetAreaOfInterest(-30, 25, 30, -10);
    document.title = "A Multiple images with hinged mirrors";
    initialiseHelp();
    initialiseInfo();
    //updateExperimentElements();
    initialiseScene();
    PIErender();
    initialiseControls();
    formRay();
    //document.getElementsByClassName("close-button")[0].click();
    //PIEhideControlElement();
    //resetExperiment();
    //PIEhideControlElement();
    //animate();
}

// function correctPosObject()
// {
//   var ang=PIEgetInputSlider("Angle btw Mirror:");
//   var slopeM=Math.tan(90-(ang/2));
//   //console.log("ang:",ang);
//   //console.log("comp:",90-(ang/2));
//   if(circle.position.x>0)
//   {
//     if(circle.position.y<slopeM*circle.position.x)
//     {
//       circle.position.y=slopeM*circle.position.x;
//     }
//   }
//   else
//   {
//     if(circle.position.y<slopeM*circle.position.x)
//     {
//       circle.position.y=slopeM*circle.position.x;
//     }
//   }
//   PIErender();
// }

function updateExperimentElements(time,dt)
{
    t=dt/1000;
    speed=0.2;
    for(var i=animateRay.length-1;i>=0;i--)
    {
      PIEremoveElement(animateRay[i]);
      animateRay.pop();
    }
    for(var i=imagesFromLeft.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesFromLeft[i]);
      imagesFromLeft.pop();
    }
    for(var i=imagesFromRight.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesFromRight[i]);
      imagesFromRight.pop();
    }
    if(flag1==1)
    {
      if(xAnimate1>=-1.83 || xAnimate2>=-1.05 || xAnimate3<=1.83 || xAnimate4<=1.05)
      {
        if(xAnimate1>=-1.83)
        {
          speed=0.3;
          mAnimate1=Math.tan(60*Math.PI/180);
          cAnimate1=5;
          animateRay.push(makeLine(0,5,xAnimate1,mAnimate1,cAnimate1,"red"));
          PIEaddElement(animateRay[animateRay.length-1]);
          xAnimate1-=speed*t;
          if(xAnimate1<-1.83) xAnimate1=-1.831;
        }
        else
        {
          animateRay.push(makeLine2(0,5,-1.83,1.83,"red"));
          PIEaddElement(animateRay[animateRay.length-1]);
        }
        if(xAnimate2>=-1.05)
        {
          speed=0.2;
          mAnimate2=Math.tan(75*Math.PI/180);
          cAnimate2=5;
          animateRay.push(makeLine(0,5,xAnimate2,mAnimate2,cAnimate2,"red"));
          PIEaddElement(animateRay[animateRay.length-1]);
          xAnimate2-=speed*t;
          if(xAnimate2<-1.05) xAnimate2=-1.051;
        }
        else
        {
          animateRay.push(makeLine2(0,5,-1.05,1.05,"red"));
          PIEaddElement(animateRay[animateRay.length-1]);
        }
        if(xAnimate3<=1.83)
        {
          speed=0.3;
          mAnimate3=-Math.tan(60*Math.PI/180);
          cAnimate3=5;
          animateRay.push(makeLine(0,5,xAnimate3,mAnimate3,cAnimate3,"red"));
          PIEaddElement(animateRay[animateRay.length-1]);
          xAnimate3+=speed*t;
          if(xAnimate3>1.83) xAnimate3=1.831;
        }
        else
        {
          animateRay.push(makeLine2(0,5,1.83,1.83,"red"));
          PIEaddElement(animateRay[animateRay.length-1]);
        }
        if(xAnimate4<=1.05)
        {
          speed=0.2;
          mAnimate4=-Math.tan(75*Math.PI/180);
          cAnimate4=5;
          animateRay.push(makeLine(0,5,xAnimate4,mAnimate4,cAnimate4,"red"));
          PIEaddElement(animateRay[animateRay.length-1]);
          xAnimate4+=speed*t;
          if(xAnimate4>1.05) xAnimate4=1.051;
        }
        else
        {
          animateRay.push(makeLine2(0,5,1.05,1.05,"red"));
          PIEaddElement(animateRay[animateRay.length-1]);
        }
      }
      else
      {
        flag1=0;
        flag2=1;
        xAnimate3=1.05;
        xAnimate4=1.83;
        animateRay.push(makeLine2(0,5,-1.83,1.83,"red"));
        PIEaddElement(animateRay[animateRay.length-1]);
        animateRay.push(makeLine2(0,5,-1.05,1.05,"red"));
        PIEaddElement(animateRay[animateRay.length-1]);
        animateRay.push(makeLine2(0,5,1.83,1.83,"red"));
        PIEaddElement(animateRay[animateRay.length-1]);
        animateRay.push(makeLine2(0,5,1.05,1.05,"red"));
        PIEaddElement(animateRay[animateRay.length-1]);
      }
    }
    else
    {
      animateRay.push(makeLine2(0,5,-1.83,1.83,"red"));
      PIEaddElement(animateRay[animateRay.length-1]);
      animateRay.push(makeLine2(0,5,-1.05,1.05,"red"));
      PIEaddElement(animateRay[animateRay.length-1]);
      animateRay.push(makeLine2(0,5,1.83,1.83,"red"));
      PIEaddElement(animateRay[animateRay.length-1]);
      animateRay.push(makeLine2(0,5,1.05,1.05,"red"));
      PIEaddElement(animateRay[animateRay.length-1]);
      if(flag2==1)
      {
        if(xAnimate1<=6.83 || xAnimate2<=1.83 || xAnimate3>=-1.83 || xAnimate4>=-6.83)
        {
          if(xAnimate1<=6.83)
          {
            speed=0.4;
            mAnimate1=Math.tan(30*Math.PI/180);
            cAnimate1=5*Math.tan(30*Math.PI/180);
            animateRay.push(makeLine(-1.83,1.83,xAnimate1,mAnimate1,cAnimate1,"green"));
            PIEaddElement(animateRay[animateRay.length-1]);
            xAnimate1+=speed*t;
            if(xAnimate1>6.83) xAnimate1=6.831;
          }
          else
          {
            animateRay.push(makeLine2(-1.83,1.83,6.83,6.83,"green"));
            PIEaddElement(animateRay[animateRay.length-1]);
          }
          if(xAnimate2<=1.83)
          {
            speed=0.2;
            mAnimate2=Math.tan(15*Math.PI/180);
            cAnimate2=5*Math.tan(15*Math.PI/180);
            animateRay.push(makeLine(-1.05,1.05,xAnimate2,mAnimate2,cAnimate2,"green"));
            PIEaddElement(animateRay[animateRay.length-1]);
            xAnimate2+=speed*t;
            if(xAnimate2>1.83) xAnimate2=1.831;
          }
          else
          {
            animateRay.push(makeLine2(-1.05,1.05,1.83,1.83,"green"));
            PIEaddElement(animateRay[animateRay.length-1]);
          }
          if(xAnimate3>=-1.83)
          {
            mAnimate3=-Math.tan(15*Math.PI/180);
            cAnimate3=5*Math.tan(15*Math.PI/180);
            animateRay.push(makeLine(1.05,1.05,xAnimate3,mAnimate3,cAnimate3,"green"));
            PIEaddElement(animateRay[animateRay.length-1]);
            xAnimate3-=speed*t;
            if(xAnimate3<-1.83) xAnimate3=-1.831;
          }
          else
          {
            animateRay.push(makeLine2(1.05,1.05,-1.83,1.83,"green"));
            PIEaddElement(animateRay[animateRay.length-1]);
          }
          if(xAnimate4>=-6.83)
          {
            speed=0.4;
            mAnimate4=-Math.tan(30*Math.PI/180);
            cAnimate4=5*Math.tan(30*Math.PI/180);
            animateRay.push(makeLine(1.83,1.83,xAnimate4,mAnimate4,cAnimate4,"green"));
            PIEaddElement(animateRay[animateRay.length-1]);
            xAnimate4-=speed*t;
            if(xAnimate4<-6.83) xAnimate4=-6.831;
          }
          else
          {
            animateRay.push(makeLine2(1.83,1.83,-6.83,6.83,"green"));
            PIEaddElement(animateRay[animateRay.length-1]);
          }
        }
        else
        {
          //PIEstopAnimation();
          flag1=0;
          flag2=0;
          flag3=1;
          xAnimate1=-1.83;
          xAnimate2=-1.05;
          xAnimate3=1.05;
          xAnimate4=1.83;

          animateRay.push(makeLine2(-1.83,1.83,6.83,6.83,"green"));
          PIEaddElement(animateRay[animateRay.length-1]);
          animateRay.push(makeLine2(-1.05,1.05,1.83,1.83,"green"));
          PIEaddElement(animateRay[animateRay.length-1]);
          animateRay.push(makeLine2(1.05,1.05,-1.83,1.83,"green"));
          PIEaddElement(animateRay[animateRay.length-1]);
          animateRay.push(makeLine2(1.83,1.83,-6.83,6.83,"green"));
          PIEaddElement(animateRay[animateRay.length-1]);
        }
      }
      else
      {
        animateRay.push(makeLine2(-1.83,1.83,6.83,6.83,"green"));
        PIEaddElement(animateRay[animateRay.length-1]);
        animateRay.push(makeLine2(-1.05,1.05,1.83,1.83,"green"));
        PIEaddElement(animateRay[animateRay.length-1]);
        animateRay.push(makeLine2(1.05,1.05,-1.83,1.83,"green"));
        PIEaddElement(animateRay[animateRay.length-1]);
        animateRay.push(makeLine2(1.83,1.83,-6.83,6.83,"green"));
        PIEaddElement(animateRay[animateRay.length-1]);
        //PIEstopAnimation();
        if(flag3==1)
        {
          if(xAnimate1>=-5 || xAnimate2>=-5 || xAnimate3<=5 || xAnimate4<=5)
          {
            if(xAnimate1>=-5)
            {
              mAnimate1=Math.tan(30*Math.PI/180);
              cAnimate1=5*Math.tan(30*Math.PI/180);
              animateRay.push(makeLine(-1.83,1.83,xAnimate1,mAnimate1,cAnimate1,"pink"));
              PIEaddElement(animateRay[animateRay.length-1]);
              xAnimate1-=speed*t;
              if(xAnimate1<-5) xAnimate1=-5.001;
            }
            else
            {
              animateRay.push(makeLine2(-1.83,1.83,-5,0,"pink"));
              PIEaddElement(animateRay[animateRay.length-1]);
            }
            if(xAnimate2>=-5)
            {
              mAnimate2=Math.tan(15*Math.PI/180);
              cAnimate2=5*Math.tan(15*Math.PI/180);
              animateRay.push(makeLine(-1.05,1.05,xAnimate2,mAnimate2,cAnimate2,"pink"));
              PIEaddElement(animateRay[animateRay.length-1]);
              xAnimate2-=speed*t;
              if(xAnimate2<-5) xAnimate2=-5.001;
            }
            else
            {
              animateRay.push(makeLine2(-1.05,1.05,-5,0,"pink"));
              PIEaddElement(animateRay[animateRay.length-1]);
            }
            if(xAnimate3<=5)
            {
              mAnimate3=-Math.tan(15*Math.PI/180);
              cAnimate3=5*Math.tan(15*Math.PI/180);
              animateRay.push(makeLine(1.05,1.05,xAnimate3,mAnimate3,cAnimate3,"pink"));
              PIEaddElement(animateRay[animateRay.length-1]);
              xAnimate3+=speed*t;
              if(xAnimate3>5) xAnimate3=5.001;
            }
            else
            {
              animateRay.push(makeLine2(1.05,1.05,5,0,"pink"));
              PIEaddElement(animateRay[animateRay.length-1]);
            }
            if(xAnimate4<=5)
            {
              mAnimate4=-Math.tan(30*Math.PI/180);
              cAnimate4=5*Math.tan(30*Math.PI/180);
              animateRay.push(makeLine(1.83,1.83,xAnimate4,mAnimate4,cAnimate4,"pink"));
              PIEaddElement(animateRay[animateRay.length-1]);
              xAnimate4+=speed*t;
              if(xAnimate4>5) xAnimate4=5.001;
            }
            else
            {
              animateRay.push(makeLine2(1.83,1.83,5,0,"pink"));
              PIEaddElement(animateRay[animateRay.length-1]);
            }
          }
          else
          {
            //PIEstopAnimation();
            flag1=0;
            flag2=0;
            flag3=0;
            flag4=1;
            xAnimate1=-5;
            xAnimate2=-5;
            xAnimate3=5;
            xAnimate4=5;

            animateRay.push(makeLine2(-1.83,1.83,-5,0,"pink"));
            PIEaddElement(animateRay[animateRay.length-1]);
            animateRay.push(makeLine2(-1.05,1.05,-5,0,"pink"));
            PIEaddElement(animateRay[animateRay.length-1]);
            animateRay.push(makeLine2(1.05,1.05,5,0,"pink"));
            PIEaddElement(animateRay[animateRay.length-1]);
            animateRay.push(makeLine2(1.83,1.83,5,0,"pink"));
            PIEaddElement(animateRay[animateRay.length-1]);

            var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
            var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
            imagesFromLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
            imagesFromLeft[imagesFromLeft.length-1].position.x=-5;
            PIEaddElement(imagesFromLeft[imagesFromLeft.length-1]);

            var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
            var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
            imagesFromRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
            imagesFromRight[imagesFromRight.length-1].position.x=5;
            PIEaddElement(imagesFromRight[imagesFromRight.length-1]);
          }
        }
        else
        {

          animateRay.push(makeLine2(-1.83,1.83,-5,0,"pink"));
          PIEaddElement(animateRay[animateRay.length-1]);
          animateRay.push(makeLine2(-1.05,1.05,-5,0,"pink"));
          PIEaddElement(animateRay[animateRay.length-1]);
          animateRay.push(makeLine2(1.05,1.05,5,0,"pink"));
          PIEaddElement(animateRay[animateRay.length-1]);
          animateRay.push(makeLine2(1.83,1.83,5,0,"pink"));
          PIEaddElement(animateRay[animateRay.length-1]);

          var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
          var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
          imagesFromLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
          imagesFromLeft[imagesFromLeft.length-1].position.x=-5;
          PIEaddElement(imagesFromLeft[imagesFromLeft.length-1]);

          var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
          var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
          imagesFromRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
          imagesFromRight[imagesFromRight.length-1].position.x=5;
          PIEaddElement(imagesFromRight[imagesFromRight.length-1]);

          //PIEstopAnimation();

          if(flag4==1)
          {
            if(xAnimate1<=6.83 || xAnimate2<=1.83 || xAnimate3>=-1.83 || xAnimate4>=-6.83)
            {
              if(xAnimate1<=6.83)
              {
                speed=0.3;
                mAnimate1=Math.tan(30*Math.PI/180);
                cAnimate1=5*Math.tan(30*Math.PI/180);
                animateRay.push(makeLine(-5,0,xAnimate1,mAnimate1,cAnimate1,"red"));
                PIEaddElement(animateRay[animateRay.length-1]);
                xAnimate1+=speed*t;
                if(xAnimate1>6.83) xAnimate1=6.831;
              }
              else
              {
                animateRay.push(makeLine2(-5,0,6.83,6.83,"red"));
                PIEaddElement(animateRay[animateRay.length-1]);
              }
              if(xAnimate2<=1.83)
              {
                speed=0.2;
                mAnimate2=Math.tan(15*Math.PI/180);
                cAnimate2=5*Math.tan(15*Math.PI/180);
                animateRay.push(makeLine(-5,0,xAnimate2,mAnimate2,cAnimate2,"red"));
                PIEaddElement(animateRay[animateRay.length-1]);
                xAnimate2+=speed*t;
                if(xAnimate2>1.83) xAnimate2=1.831;
              }
              else
              {
                animateRay.push(makeLine2(-5,0,1.83,1.83,"red"));
                PIEaddElement(animateRay[animateRay.length-1]);
              }
              if(xAnimate3>=-1.83)
              {
                mAnimate3=-Math.tan(15*Math.PI/180);
                cAnimate3=5*Math.tan(15*Math.PI/180);
                animateRay.push(makeLine(5,0,xAnimate3,mAnimate3,cAnimate3,"red"));
                PIEaddElement(animateRay[animateRay.length-1]);
                xAnimate3-=speed*t;
                if(xAnimate3<-1.83) xAnimate3=-1.831;
              }
              else
              {
                animateRay.push(makeLine2(5,0,-1.83,1.83,"red"));
                PIEaddElement(animateRay[animateRay.length-1]);
              }
              if(xAnimate4>=-6.83)
              {
                speed=0.3;
                mAnimate4=-Math.tan(30*Math.PI/180);
                cAnimate4=5*Math.tan(30*Math.PI/180);
                animateRay.push(makeLine(5,0,xAnimate4,mAnimate4,cAnimate4,"red"));
                PIEaddElement(animateRay[animateRay.length-1]);
                xAnimate4-=speed*t;
                if(xAnimate4<-6.83) xAnimate4=-6.831;
              }
              else
              {
                animateRay.push(makeLine2(5,0,-6.83,6.83,"red"));
                PIEaddElement(animateRay[animateRay.length-1]);
              }
            }
            else
            {
              //PIEstopAnimation();
              flag1=0;
              flag2=0;
              flag3=0;
              flag4=0;
              flag5=1;
              xAnimate1=6.83;
              xAnimate2=1.83;
              xAnimate3=-1.83;
              xAnimate4=-6.83;

              animateRay.push(makeLine2(-5,0,6.83,6.83,"red"));
              PIEaddElement(animateRay[animateRay.length-1]);
              animateRay.push(makeLine2(-5,0,1.83,1.83,"red"));
              PIEaddElement(animateRay[animateRay.length-1]);
              animateRay.push(makeLine2(5,0,-1.83,1.83,"red"));
              PIEaddElement(animateRay[animateRay.length-1]);
              animateRay.push(makeLine2(5,0,-6.83,6.83,"red"));
              PIEaddElement(animateRay[animateRay.length-1]);
              //PIEstopAnimation();
            }
          }
          else
          {
            animateRay.push(makeLine2(-5,0,6.83,6.83,"red"));
            PIEaddElement(animateRay[animateRay.length-1]);
            animateRay.push(makeLine2(-5,0,1.83,1.83,"red"));
            PIEaddElement(animateRay[animateRay.length-1]);
            animateRay.push(makeLine2(5,0,-1.83,1.83,"red"));
            PIEaddElement(animateRay[animateRay.length-1]);
            animateRay.push(makeLine2(5,0,-6.83,6.83,"red"));
            PIEaddElement(animateRay[animateRay.length-1]);

            if(flag5==1)
            {
              if(xAnimate1<=9.81 || xAnimate2<=3.75 || xAnimate3>=-3.75 || xAnimate4>=-9.81)
              {
                if(xAnimate1<=9.81)
                {
                  mAnimate1=Math.tan(60*Math.PI/180);
                  cAnimate1=-5;
                  animateRay.push(makeLine(6.83,6.83,xAnimate1,mAnimate1,cAnimate1,"green"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                  xAnimate1+=speed*t;
                  if(xAnimate1>9.81) xAnimate1=9.811;
                }
                else
                {
                  animateRay.push(makeLine2(6.83,6.83,9.81,(9.81*Math.tan(60*Math.PI/180)-5),"green"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                }
                if(xAnimate2<=3.75)
                {
                  mAnimate2=Math.tan(75*Math.PI/180);
                  cAnimate2=-5;
                  animateRay.push(makeLine(1.83,1.83,xAnimate2,mAnimate2,cAnimate2,"green"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                  xAnimate2+=speed*t;
                  if(xAnimate2>3.75) xAnimate2=3.751;
                }
                else
                {
                  animateRay.push(makeLine2(1.83,1.83,3.75,(3.75*Math.tan(75*Math.PI/180)-5),"green"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                }
                if(xAnimate3>=-3.75)
                {
                  mAnimate3=-Math.tan(75*Math.PI/180);
                  cAnimate3=-5;
                  animateRay.push(makeLine(-1.83,1.83,xAnimate3,mAnimate3,cAnimate3,"green"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                  xAnimate3-=speed*t;
                  if(xAnimate3<-3.75) xAnimate3=-3.751;
                }
                else
                {
                  animateRay.push(makeLine2(-1.83,1.83,-3.75,(-3.75*(-1)*Math.tan(75*Math.PI/180)-5),"green"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                }
                if(xAnimate4>=-9.81)
                {
                  mAnimate4=-Math.tan(60*Math.PI/180);
                  cAnimate4=-5;
                  animateRay.push(makeLine(-6.83,6.83,xAnimate4,mAnimate4,cAnimate4,"green"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                  xAnimate4-=speed*t;
                  if(xAnimate4<-9.81) xAnimate4=-9.811;
                }
                else
                {
                  animateRay.push(makeLine2(-6.83,6.83,-9.81,(-9.81*(-1)*Math.tan(60*Math.PI/180)-5),"green"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                }
              }
              else
              {
                //PIEstopAnimation();
                flag1=0;
                flag2=0;
                flag3=0;
                flag4=0;
                flag5=0;
                flag6=1;
                xAnimate1=6.83;
                xAnimate2=1.83;
                xAnimate3=-1.83;
                xAnimate4=-6.83;

                animateRay.push(makeLine2(6.83,6.83,9.81,(9.81*Math.tan(60*Math.PI/180)-5),"green"));
                PIEaddElement(animateRay[animateRay.length-1]);
                animateRay.push(makeLine2(1.83,1.83,3.75,(3.75*Math.tan(75*Math.PI/180)-5),"green"));
                PIEaddElement(animateRay[animateRay.length-1]);
                animateRay.push(makeLine2(-1.83,1.83,-3.75,(-3.75*(-1)*Math.tan(75*Math.PI/180)-5),"green"));
                PIEaddElement(animateRay[animateRay.length-1]);
                animateRay.push(makeLine2(-6.83,6.83,-9.81,(-9.81*(-1)*Math.tan(60*Math.PI/180)-5),"green"));
                PIEaddElement(animateRay[animateRay.length-1]);
                //PIEstopAnimation();
              }
            }
            else
            {
              animateRay.push(makeLine2(6.83,6.83,9.81,(9.81*Math.tan(60*Math.PI/180)-5),"green"));
              PIEaddElement(animateRay[animateRay.length-1]);
              animateRay.push(makeLine2(1.83,1.83,3.75,(3.75*Math.tan(75*Math.PI/180)-5),"green"));
              PIEaddElement(animateRay[animateRay.length-1]);
              animateRay.push(makeLine2(-1.83,1.83,-3.75,(-3.75*(-1)*Math.tan(75*Math.PI/180)-5),"green"));
              PIEaddElement(animateRay[animateRay.length-1]);
              animateRay.push(makeLine2(-6.83,6.83,-9.81,(-9.81*(-1)*Math.tan(60*Math.PI/180)-5),"green"));
              PIEaddElement(animateRay[animateRay.length-1]);

              if(flag6==1)
              {
                if(xAnimate1>=0 || xAnimate2>=0 || xAnimate3<=0 || xAnimate4<=0)
                {
                  if(xAnimate1>=0)
                  {
                    speed=0.5;
                    mAnimate1=Math.tan(60*Math.PI/180);
                    cAnimate1=-5;
                    animateRay.push(makeLine(6.83,6.83,xAnimate1,mAnimate1,cAnimate1,"pink"));
                    PIEaddElement(animateRay[animateRay.length-1]);
                    xAnimate1-=speed*t;
                    if(xAnimate1<0) xAnimate1=-0.001;
                  }
                  else
                  {
                    animateRay.push(makeLine2(6.83,6.83,0,-5,"pink"));
                    PIEaddElement(animateRay[animateRay.length-1]);
                  }
                  if(xAnimate2>=0)
                  {
                    speed=0.2;
                    mAnimate2=Math.tan(75*Math.PI/180);
                    cAnimate2=-5;
                    animateRay.push(makeLine(1.83,1.83,xAnimate2,mAnimate2,cAnimate2,"pink"));
                    PIEaddElement(animateRay[animateRay.length-1]);
                    xAnimate2-=speed*t;
                    if(xAnimate2<0) xAnimate2=-0.001;
                  }
                  else
                  {
                    animateRay.push(makeLine2(1.83,1.83,0,-5,"pink"));
                    PIEaddElement(animateRay[animateRay.length-1]);
                  }
                  if(xAnimate3<=0)
                  {
                    speed=0.2;
                    mAnimate3=-Math.tan(75*Math.PI/180);
                    cAnimate3=-5;
                    animateRay.push(makeLine(-1.83,1.83,xAnimate3,mAnimate3,cAnimate3,"pink"));
                    PIEaddElement(animateRay[animateRay.length-1]);
                    xAnimate3+=speed*t;
                    if(xAnimate3>0) xAnimate3=0.001;
                  }
                  else
                  {
                    animateRay.push(makeLine2(-1.83,1.83,0,-5,"pink"));
                    PIEaddElement(animateRay[animateRay.length-1]);
                  }
                  if(xAnimate4<=0)
                  {
                    speed=0.5;
                    mAnimate4=-Math.tan(60*Math.PI/180);
                    cAnimate4=-5;
                    animateRay.push(makeLine(-6.83,6.83,xAnimate4,mAnimate4,cAnimate4,"pink"));
                    PIEaddElement(animateRay[animateRay.length-1]);
                    xAnimate4+=speed*t;
                    if(xAnimate4>0) xAnimate4=0.001;
                  }
                  else
                  {
                    animateRay.push(makeLine2(-6.83,6.83,0,-5,"pink"));
                    PIEaddElement(animateRay[animateRay.length-1]);
                  }
                }
                else
                {
                  //PIEstopAnimation();
                  flag1=0;
                  flag2=0;
                  flag3=0;
                  flag4=0;
                  flag5=0;
                  flag6=0;
                  xAnimate1=0;
                  xAnimate2=0;
                  xAnimate3=0;
                  xAnimate4=0;

                  animateRay.push(makeLine2(6.83,6.83,0,-5,"pink"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                  animateRay.push(makeLine2(1.83,1.83,0,-5,"pink"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                  animateRay.push(makeLine2(-1.83,1.83,0,-5,"pink"));
                  PIEaddElement(animateRay[animateRay.length-1]);
                  animateRay.push(makeLine2(-6.83,6.83,0,-5,"pink"));
                  PIEaddElement(animateRay[animateRay.length-1]);

                  var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
                  var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
                  imagesFromLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
                  imagesFromLeft[imagesFromLeft.length-1].position.set(0,-5,0);
                  PIEaddElement(imagesFromLeft[imagesFromLeft.length-1]);
                  lastOn=0;
                  PIEstopAnimation();
                }
              }
            }
          }
        }
      }
    }
}

function makeLine(x1,y1,x2,m2,c2,colour)
{
  var material = new THREE.LineBasicMaterial( { color:colour,linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( x1,y1, 0) );
  geometry1.vertices.push(new THREE.Vector3( x2, m2*x2+c2, 0) );
  return (new THREE.Line(geometry1,material));
}

function makeLine2(x1,y1,x2,y2,colour)
{
  var material = new THREE.LineBasicMaterial( { color:colour,linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( x1,y1, 0) );
  geometry1.vertices.push(new THREE.Vector3( x2, y2, 0) );
  return (new THREE.Line(geometry1,material));
}


function setText()
{
  var bb3="font-family:Monospace; color:#000000; margin:0px; overflow:hidden;font-size:20px;"
  var text=document.createElement("p");
  text.setAttribute("id","hello");
  text.style=bb3;
  document.body.appendChild(text);
  text.style.position="absolute";
  text.style.left=15+'%';
  text.style.top=75+'%';
}

function findImageCoord(a,b,c,p,q)
{
  var p1=(p*((a*a)-(b*b))-2*b*((a*q)+c))/((a*a)+(b*b));
  var q1=(q*(-1)*((a*a)-(b*b))-2*a*((b*p)+c))/((a*a)+(b*b));
  return [p1,q1];
}

function animate()
{
  f[0]=setTimeout( function() {
    x=0;
    posX=0;
    posY=5;
    m1=Math.tan(60*Math.PI/180);
    desX=-1.83;
    speed=0.05;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 1:Rays from the object hit the mirror.</h2>";
  }, Math.min(500,time));
  f[1]=setTimeout(function(){
    x=0;
    posX=0;
    posY=5;
    m1=(1)*Math.tan(75*Math.PI/180);
    desX=-1.05;
    speed=0.05;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 1:Rays from the object hit the mirror.</h2>";
  },Math.min(1500,time));
  f[2]=setTimeout(function(){
    x=-1.83;
    posX=-1.83;
    posY=1.83;
    m1=Math.tan(30*Math.PI/180);
    desX=6.83;
    speed=0.2;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 2:Rays after reflecting from the mirror.</h2>";
  },Math.min(2500,time));
  f[3]=setTimeout(function(){
    x=-1.05;
    posX=-1.05;
    posY=1.05;
    m1=Math.tan(15*Math.PI/180);
    desX=1.83;
    speed=0.08;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 2:Rays after reflecting from the mirror.</h2>";
  },Math.min(3500,time));
  f[4]=setTimeout(function(){
    x=-1.83;
    posX=-1.83;
    posY=1.83;
    m1=Math.tan(30*Math.PI/180);
    desX=-5;
    speed=0.1;
    colour="pink";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 3:Tracing Back the rays from the reflected rays.</h2>";
  },Math.min(4500,time));
  f[5]=setTimeout(function(){
    x=-1.05;
    posX=-1.05;
    posY=1.05;
    m1=Math.tan(15*Math.PI/180);
    //angle=10;
    desX=-5;
    speed=0.1;
    colour="pink";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 3:Tracing Back the rays from the reflected rays.</h2>";
  },Math.min(5500,time));

  //right mirror
  f[6]=setTimeout( function() {
    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
    imagesFromLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
    imagesFromLeft[0].position.x=-5;
    PIEaddElement(imagesFromLeft[0]);
    x=0;
    posX=0;
    posY=5;
    m1=(-1)*Math.tan(60*Math.PI/180);
    desX=1.83;
    speed=0.05;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 1:Rays from the object hit the mirror.</h2>";
  }, Math.min(6500,time));
  f[7]=setTimeout(function(){
    x=0;
    posX=0;
    posY=5;
    m1=(-1)*Math.tan(75*Math.PI/180);
    desX=1.05;
    speed=0.05;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 1:Rays from the object hit the mirror.</h2>";
  },Math.min(7500,time));
  f[8]=setTimeout(function(){
    x=1.83;
    posX=1.83;
    posY=1.83;
    m1=(-1)*Math.tan(30*Math.PI/180);
    desX=-6.83;
    speed=0.2;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 2:Rays after reflecting from the mirror.</h2>";
  },Math.min(8500,time));
  f[9]=setTimeout(function(){
    x=1.05;
    posX=1.05;
    posY=1.05;
    m1=-Math.tan(15*Math.PI/180);
    desX=-1.83;
    speed=0.08;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 2:Rays after reflecting from the mirror.</h2>";
  },Math.min(9500,time));
  f[10]=setTimeout(function(){
    x=1.83;
    posX=1.83;
    posY=1.83;
    m1=-Math.tan(30*Math.PI/180);
    //angle=10;
    desX=5;
    speed=0.1;
    colour="pink";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 3:Tracing Back the rays from the reflected rays.</h2>";
  },Math.min(11000,time));
  f[11]=setTimeout(function(){
    x=1.05;
    posX=1.05;
    posY=1.05;
    m1=-Math.tan(15*Math.PI/180);
    //angle=10;
    desX=5;
    speed=0.1;
    colour="pink";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 3:Tracing Back the rays from the reflected rays.</h2>";
  },Math.min(12500,time));
  f[12]=setTimeout(function(){
    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
    imagesFromRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
    imagesFromRight[0].position.x=5;
  },Math.min(13500,time));
  f[13]=setTimeout(function(){
    PIEaddElement(imagesFromRight[0]);
    x=-5;
    posX=-5;
    posY=0
    m1=Math.tan(30*Math.PI/180);
    //angle=10;
    desX=6.83;
    speed=0.2;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>The images formed by the mirror is used as the object for other mirror.</h2>";
  },Math.min(15500,time));
  f[14]=setTimeout(function(){
    x=-5;
    posX=-5;
    posY=0
    m1=Math.tan(15*Math.PI/180);
    //angle=10;
    desX=1.83;
    speed=0.2;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>These above steps are continued.</h2>";
  },Math.min(17500,time));
  f[15]=setTimeout(function(){
    x=6.83;
    posX=6.83;
    posY=6.83;
    m1=Math.tan(60*Math.PI/180);
    desX=(17)/m1;
    speed=0.2;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2></h2>";
  },Math.min(19500,time));
  f[16]=setTimeout(function(){
    x=1.83;
    posX=1.83;
    posY=1.83;
    m1=Math.tan(75*Math.PI/180);
    desX=14/m1;
    speed=0.2;
    colour="green";
    makeRay();
  },Math.min(21500,time));
  f[17]=setTimeout(function(){
    x=6.83;
    posX=6.83;
    posY=6.83;
    m1=Math.tan(60*Math.PI/180);
    //angle=10;
    desX=0;
    speed=0.2;
    colour="pink";
    makeRay();
  },Math.min(24000,time));
  f[18]=setTimeout(function(){
    x=1.83;
    posX=1.83;
    posY=1.83;
    m1=Math.tan(75*Math.PI/180);
    //angle=10;
    desX=0;
    speed=0.2;
    colour="pink";
    makeRay();
  },Math.min(26500,time));
  f[19]=setTimeout(function(){
    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
    imagesFromRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
    imagesFromRight[1].position.set(0,-5,0);
    PIEaddElement(imagesFromRight[1]);
  },Math.min(29000,time));
  f[20]=setTimeout( function() {
    x=5;
    posX=5;
    posY=0;
    m1=(-1)*Math.tan(30*Math.PI/180);
    desX=-6.83;
    speed=0.2;
    colour="red";
    makeRay();
  }, Math.min(31500,time));
  f[21]=setTimeout(function(){
    x=5;
    posX=5;
    posY=0;
    m1=(-1)*Math.tan(15*Math.PI/180);
    desX=-1.83;
    speed=0.2;
    colour="red";
    makeRay();
  },Math.min(34000,time));
  f[22]=setTimeout(function(){
    x=-6.83;
    posX=-6.83;
    posY=6.83;
    m1=(-1)*Math.tan(60*Math.PI/180);
    desX=(17/m1);
    speed=0.2;
    colour="green";
    makeRay();
  },Math.min(36500,time));
  f[23]=setTimeout(function(){
    x=-1.83;
    posX=-1.83;
    posY=1.83;
    m1=-Math.tan(75*Math.PI/180);
    desX=(14/m1);
    speed=0.2;
    colour="green";
    makeRay();
  },Math.min(39000,time));
  f[24]=setTimeout(function(){
    x=-6.83;
    posX=-6.83;
    posY=6.83;
    m1=-Math.tan(60*Math.PI/180);
    //angle=10;
    desX=0;
    speed=0.2;
    colour="pink";
    makeRay();
  },Math.min(41500,time));
  f[25]=setTimeout(function(){
    x=-1.83;
    posX=-1.83;
    posY=1.83;
    m1=-Math.tan(75*Math.PI/180);
    //angle=10;
    desX=0;
    speed=0.2;
    colour="pink";
    makeRay();
  },Math.min(44500,time));
  f[26]=setTimeout(function(){
    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
    imagesFromLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
    imagesFromLeft[1].position.set(0,-5,0);
    //PIEaddElement(imagesFromLeft[1]);
    document.getElementById("hello").innerHTML="<h2>Following the above steps,3 Images are formed.</h2>";
    PIEshowInputPanel();
    var li=document.getElementsByTagName("li");
    li[10].style.display='';
    li[11].style.display='';
    li[12].style.display='';
    li[13].style.display='';
    li[14].style.display='';
    animationFlag=0;
    //li[16].style.display='';
  },Math.min(46500,time));
}

function makeRay()
{
  c1=posY-m1*posX;
  var material = new THREE.LineBasicMaterial( { color:colour,linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( posX, posY, 0) );
  geometry1.vertices.push(new THREE.Vector3( x, m1*x+c1, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);
  speed=Math.max(speed,ultimateSpeed);
  if(desX<posX)
  {
    x=x-speed;
  }
  else
  {
    x=x+speed;
  }
  //if(time==0){x=desX;}
  PIErender();
  if(desX>posX)
  {
    if(x<=desX)
    {
      requestAnimationFrame(makeRay);
    }
  }
  else
  {
    if(desX<posX)
    {
      if(x>=desX)
      {
        requestAnimationFrame(makeRay);
      }
    }
  }
}

function formRay()
{
  //console.log("hi");
  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( circle.position.x,circle.position.y, 0) );
  geometry1.vertices.push(new THREE.Vector3( -1.83, 1.83,0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -1.83,1.83, 0) );
  geometry1.vertices.push(new THREE.Vector3( 6.83,6.83, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( circle.position.x,circle.position.y, 0) );
  geometry1.vertices.push(new THREE.Vector3( -1.056, 1.056,0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -1.056, 1.056, 0) );
  geometry1.vertices.push(new THREE.Vector3( 1.83,1.83, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"pink",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -1.83,1.83, 0) );
  geometry1.vertices.push(new THREE.Vector3( -5,0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"pink",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -1.056, 1.056, 0) );
  geometry1.vertices.push(new THREE.Vector3( -5,0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
  var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
  imagesLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
  PIEaddElement( imagesLeft[imagesLeft.length-1] );
  imagesLeft[imagesLeft.length-1].position.set(-5,0,0);

  //image from reflected ray from left mirror
  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:1.5} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -5,0, 0) );
  geometry1.vertices.push(new THREE.Vector3( 6.83,6.83, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 6.83,6.83, 0) );
  var m1=Math.tan(60*Math.PI/180);
  var c1=-5
  var y=12;
  var x=(y-c1)/m1;
  geometry1.vertices.push(new THREE.Vector3( x,y, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:1.5} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -5,0, 0) );
  geometry1.vertices.push(new THREE.Vector3( 1.83,1.83, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 1.83,1.83, 0) );
  var m1=Math.tan(75*Math.PI/180);
  var c1=-5
  var y=8;
  var x=(y-c1)/m1;
  geometry1.vertices.push(new THREE.Vector3( x,y, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 1.83,1.83, 0) );
  geometry1.vertices.push(new THREE.Vector3( 0,-5, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 6.83, 6.83, 0) );
  geometry1.vertices.push(new THREE.Vector3( 0,-5, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
  var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
  imagesRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
  PIEaddElement( imagesRight[imagesRight.length-1] );
  imagesRight[imagesRight.length-1].position.set(0,-5,0);

  //right mirror
  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( circle.position.x,circle.position.y, 0) );
  geometry1.vertices.push(new THREE.Vector3( 1.83, 1.83,0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 1.83,1.83, 0) );
  geometry1.vertices.push(new THREE.Vector3( -6.83,6.83, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( circle.position.x,circle.position.y, 0) );
  geometry1.vertices.push(new THREE.Vector3( 1.056, 1.056,0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 1.056, 1.056, 0) );
  geometry1.vertices.push(new THREE.Vector3( -1.83,1.83, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"pink",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 1.83,1.83, 0) );
  geometry1.vertices.push(new THREE.Vector3( 5,0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"pink",linewidth:3} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 1.056, 1.056, 0) );
  geometry1.vertices.push(new THREE.Vector3( 5,0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
  var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
  imagesRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
  PIEaddElement( imagesRight[imagesRight.length-1] );
  imagesRight[imagesRight.length-1].position.set(5,0,0);

  //image from reflected ray from right mirror
  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:1.5} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 5,0, 0) );
  geometry1.vertices.push(new THREE.Vector3( -6.83,6.83, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -6.83,6.83, 0) );
  var m1=-Math.tan(60*Math.PI/180);
  var c1=-5
  var y=12;
  var x=(y-c1)/m1;
  geometry1.vertices.push(new THREE.Vector3( x,y, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:1.5} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 5,0, 0) );
  geometry1.vertices.push(new THREE.Vector3( -1.83,1.83, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -1.83,1.83, 0) );
  var m1=-Math.tan(75*Math.PI/180);
  var c1=-5
  var y=8;
  var x=(y-c1)/m1;
  geometry1.vertices.push(new THREE.Vector3( x,y, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -1.83,1.83, 0) );
  geometry1.vertices.push(new THREE.Vector3( 0,-5, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -6.83, 6.83, 0) );
  geometry1.vertices.push(new THREE.Vector3( 0,-5, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
  var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
  imagesLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
  PIEaddElement( imagesLeft[imagesLeft.length-1] );
  imagesLeft[imagesLeft.length-1].position.set(0,-5,0);
}

function updateTable()
{
  var flag=0;
  for(var i=0;i<angles.length;i++)
  {
    if(angles[i]==PIEgetInputSlider("Angle btw Mirror:"))
    {
      flag=1;
      break;
    }
  }
  if(flag==0)
  {
    angles.push(PIEgetInputSlider("Angle btw Mirror:"));
    PIEupdateTableCell(counter,0,counter+".");
    PIEupdateTableCell(counter,1,""+PIEgetInputSlider("Angle btw Mirror:"));
    PIEupdateTableCell(counter,2,""+((360/PIEgetInputSlider("Angle btw Mirror:"))-1));
    counter++;
  }
}

//It initialize the controls
function initialiseControls(){
  PIEaddInputCheckbox("Rotate Mirror",false, function()
  {
    if(turn==0)
    {
      turn=1;
      //PIEchangeDisplayCheckbox("Rotate Mirror",true);
      for(var i=imagesLeft.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesLeft[i]);
        imagesLeft.pop();
      }
      for(var i=imagesRight.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesRight[i]);
        imagesRight.pop();
      }
      for(var i=imagesFromLeft.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesFromLeft[i]);
        imagesFromLeft.pop();
      }
      for(var i=imagesFromRight.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesFromRight[i]);
        imagesFromRight.pop();
      }
      for(var i=animateRay.length-1;i>=0;i--)
      {
        PIEremoveElement(animateRay[i]);
        animateRay.pop();
      }
      // PIEremoveDragElement(leftMirror);
      // PIEremoveDragElement(rightMirror);
      //PIEremoveDragElement(circle);
      resetExperiment();
      formRay();
      PIErender();
      if(lastOn==1) lastOn=0;
      PIEchangeInputSlider("Angle btw Mirror:",90);
      document.getElementById("hello").innerHTML="<h2></h2>";
      // var li=document.getElementsByTagName("li");
      // li[16].style.display='';
      //animate();
    }
    else
    {
      //setInterval(function(){time=0;x=desX;},5000);
      turn=0;
      //PIEchangeDisplayCheckbox("Rotate Mirror",false);
      for(var i=ray1.length-1;i>=0;i--)
        {
          PIEremoveElement(ray1[i]);
          ray1.pop();
        }
      for(var i=imagesFromLeft.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesFromLeft[i]);
        imagesFromLeft.pop();
      }
      for(var i=imagesFromRight.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesFromRight[i]);
        imagesFromRight.pop();
      }
      for(var i=animateRay.length-1;i>=0;i--)
      {
        PIEremoveElement(animateRay[i]);
        animateRay.pop();
      }
      if(lastOn==1) lastOn=0;
      document.getElementById("hello").innerHTML="<h2></h2>";
      //PIEstartButton.removeEventListener("mousemove", myFunction);
      // while(object.children.length)
      // {
      //   object.children.remove(object.children[0]);
      // }
      // for(var i=PIEsceneElements.length-1;i>=0;i--)
      // {
      //   PIEremoveElement(PIEsceneElements[i]);
      //   PIEsceneElements.pop();
      // }
      // PIErender();
      // //PIEaddElement(PIEscene);
      // PIEaddElement(leftMirror);
      // PIEaddElement(rightMirror);
      // PIEaddElement(circle);
      // PIEdragElement(circle);
      // PIEsetDragEnd(circle,correctPosObject);
      resetExperiment();
      rotateMirror();
      document.getElementById("hello").innerHTML="<h2>Number of images formed is 3.</h2>";
      // PIEdragElement(leftMirror);
      // PIEsetDragEnd(leftMirror,rotateMirror);
      // PIEdragElement(rightMirror);
      // PIEsetDragEnd(rightMirror,rotateMirror);
      // PIEdragElement(circle);
      // PIEsetDragEnd(circle,rotateMirror);
      PIErender();
      // var li=document.getElementsByTagName("li");
      // li[16].style.display='none';
    }
    //console.log(turn);
  });
  PIEaddInputSlider("Angle btw Mirror:", 90, function()
  {
    if(turn==0)
    {
      //if(lastOn==0)
      //{
        if(360%PIEgetInputSlider("Angle btw Mirror:")!=0)
        {
          var c=PIEgetInputSlider("Angle btw Mirror:");
          var d=Math.floor(360/PIEgetInputSlider("Angle btw Mirror:"));
          //console.log("c=",c);
          //console.log("d=",d);
          if(d==7)
          {
            PIEchangeInputSlider("Angle btw Mirror:",60);
          }
          else
          {
            if(c==25)
            {
              PIEchangeInputSlider("Angle btw Mirror:",24);
            }
            else
            {
              PIEchangeInputSlider("Angle btw Mirror:",360/d);
            }
          }
        }
          for(var i=animateRay.length-1;i>=0;i--)
          {
            PIEremoveElement(animateRay[i]);
            animateRay.pop();
          }
          for(var i=imagesFromLeft.length-1;i>=0;i--)
          {
            PIEremoveElement(imagesFromLeft[i]);
            imagesFromLeft.pop();
          }
          for(var i=imagesFromRight.length-1;i>=0;i--)
          {
            PIEremoveElement(imagesFromRight[i]);
            imagesFromRight.pop();
          }
          rotateMirror();
      //}
      // else
      // {
      //   PIEchangeInputSlider("Angle btw Mirror:",90);
      // }
    }
    else
    {
        PIEchangeInputSlider("Angle btw Mirror:",90);
    }
  },10, 180, 5);
  PIEaddInputCommand("Demo Mode", function()
   {
      // var li=document.getElementsByTagName("li");
      // li[10].style.display='none';
      // li[11].style.display='none';
      // li[12].style.display='none';
      // li[13].style.display='none';
      // li[14].style.display='none';
      // //li[16].style.display='none';
      if(lastOn==1)
      {
        if(turn==0)
        {
          for(var i=imagesLeft.length-1;i>=0;i--)
          {
            PIEremoveElement(imagesLeft[i]);
            imagesLeft.pop();
          }
          for(var i=imagesRight.length-1;i>=0;i--)
          {
            PIEremoveElement(imagesRight[i]);
            imagesRight.pop();
          }
          leftMirror.position.x=-halfLength*Math.cos(45*Math.PI/180);
          leftMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
          leftMirror.rotation.z=45*Math.PI/180;

          rightMirror.position.x=halfLength*Math.cos(45*Math.PI/180);
          rightMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
          rightMirror.rotation.z=-45*Math.PI/180;

          PIEchangeInputSlider("Angle btw Mirror:",90);
          document.getElementById("hello").innerHTML="<h2></h2>";
          PIErender();
        }
      }
      else
      {
        lastOn=1;
        flag1=1;
        flag2=0;
        flag3=0;
        flag4=0;
        flag5=0;
        flag6=0;
        xAnimate1=0;
        xAnimate2=0;
        xAnimate3=0;
        xAnimate4=0;
        leftMirror.position.x=-halfLength*Math.cos(45*Math.PI/180);
        leftMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
        leftMirror.rotation.z=45*Math.PI/180;

        rightMirror.position.x=halfLength*Math.cos(45*Math.PI/180);
        rightMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
        rightMirror.rotation.z=-45*Math.PI/180;
        for(var i=ray1.length-1;i>=0;i--)
          {
            PIEremoveElement(ray1[i]);
            ray1.pop();
          }
        for(var i=imagesLeft.length-1;i>=0;i--)
        {
          PIEremoveElement(imagesLeft[i]);
          imagesLeft.pop();
        }
        for(var i=imagesRight.length-1;i>=0;i--)
        {
          PIEremoveElement(imagesRight[i]);
          imagesRight.pop();
        }
        for(var i=imagesFromLeft.length-1;i>=0;i--)
        {
          PIEremoveElement(imagesFromLeft[i]);
          imagesFromLeft.pop();
        }
        for(var i=imagesFromRight.length-1;i>=0;i--)
        {
          PIEremoveElement(imagesFromRight[i]);
          imagesFromRight.pop();
        }
        //console.log("hi");
        //console.log(animateRay.length-1);
        for(var i=animateRay.length-1;i>=0;i--)
        {
          PIEremoveElement(animateRay[i]);
          animateRay.pop();
        }
        PIEchangeInputSlider("Angle btw Mirror:",90);
        document.getElementById("hello").innerHTML="<h2></h2>";
        PIErender();
      }
      PIEstartAnimation();
  });
  PIEaddInputCommand("Note Reading", function(){
    if(turn==1)
    {
      if(PIEgetInputSlider("Angle btw Mirror:")==90)
      {
        updateTable();
      }
      else
      {
        PIEchangeInputSlider("Angle btw Mirror:",90);
        updateTable();
      }
    }
    else
    {
      updateTable();
    }
      //console.log(angles);
  });
  PIEaddInputCommand("Clear Table", function(){
    for(var i=1;i<=counter-1;i++)
    {
      PIEupdateTableCell(i,0,"");
      PIEupdateTableCell(i,1,"");
      PIEupdateTableCell(i,2,"");
    }
    //console.log(angles);
    // for(var j=0;j<angles.length;j++)
    // {
    //   angles.pop();
    // }
    var j=angles.length-1;
    while(j>=0)
    {
      angles.pop();
      j--;
    }
    //console.log(angles);
    counter=1;
  });
}

function rotateMirror()
{
  for(var i=imagesLeft.length-1;i>=0;i--)
  {
    PIEremoveElement(imagesLeft[i]);
    imagesLeft.pop();
  }
  for(var i=imagesRight.length-1;i>=0;i--)
  {
    PIEremoveElement(imagesRight[i]);
    imagesRight.pop();
  }
  var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
  var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
  angleLeft=PIEgetInputSlider("Angle btw Mirror:")/2;
  leftMirror.rotation.z=angleLeft*Math.PI/180;
  leftMirror.position.set(-halfLength*Math.cos((90-angleLeft)*Math.PI/180),halfLength*Math.sin((90-angleLeft)*Math.PI/180),0);
  var m=Math.tan((90+angleLeft)*Math.PI/180);
  var c=leftMirror.position.y-m*leftMirror.position.x;
  var coords=findImageCoord(1,-m,-c,circle.position.x,circle.position.y);

  imagesLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
  imagesLeft[0].position.x=coords[0];
  imagesLeft[0].position.y=coords[1];
  PIEaddElement(imagesLeft[0]);

  angleRight=PIEgetInputSlider("Angle btw Mirror:")/2;
  rightMirror.rotation.z=-angleRight*Math.PI/180;
  rightMirror.position.set(halfLength*Math.cos((90-angleRight)*Math.PI/180),halfLength*Math.sin((90-angleRight)*Math.PI/180),0);
  var m=Math.tan((90-angleRight)*Math.PI/180);
  var c=rightMirror.position.y-m*rightMirror.position.x;
  var coords=findImageCoord(1,-m,-c,circle.position.x,circle.position.y);

  imagesRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
  imagesRight[0].position.x=coords[0];
  imagesRight[0].position.y=coords[1];
  PIEaddElement(imagesRight[0]);
  //console.log("object: "+circle.position.x+" "+circle.position.y);
  for(var i=1;i<20;i++)
  {
    angleLeft=PIEgetInputSlider("Angle btw Mirror:")/2;
    leftMirror.rotation.z=angleLeft*Math.PI/180;
    var m=Math.tan((90+angleLeft)*Math.PI/180);
    var c=leftMirror.position.y-m*leftMirror.position.x;
    var coords=findImageCoord(1,-m,-c,imagesRight[i-1].position.x,imagesRight[i-1].position.y);
    imagesLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
    //console.log("image: "+(Math.round(coords[0]*1000)/1000)+" "+(Math.round(coords[1]*1000)/1000));
    if((Math.round(coords[0]))==Math.round(circle.position.x) && (Math.round(coords[1]))==Math.round(circle.position.y))
    {
      imagesLeft[i].position.x=imagesLeft[0].position.x;
      imagesLeft[i].position.y=imagesLeft[0].position.y;
      PIEaddElement(imagesLeft[i]);
    }
    else
    {
      imagesLeft[i].position.x=(Math.round(coords[0]*1000)/1000);
      imagesLeft[i].position.y=(Math.round(coords[1]*1000)/1000);
      PIEaddElement(imagesLeft[i]);
    }

    angleRight=PIEgetInputSlider("Angle btw Mirror:")/2;
    rightMirror.rotation.z=-angleRight*Math.PI/180;
    var m=Math.tan((90-angleRight)*Math.PI/180);
    var c=rightMirror.position.y-m*rightMirror.position.x;
    var coords=findImageCoord(1,-m,-c,imagesLeft[i-1].position.x,imagesLeft[i-1].position.y);
    imagesRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
    //console.log("image: "+(Math.round(coords[0]*1000)/1000)+" "+(Math.round(coords[1]*1000)/1000));
    if((Math.round(coords[0]))==Math.round(circle.position.x) && (Math.round(coords[1]))==Math.round(circle.position.y))
    {
      imagesRight[i].position.x=imagesRight[0].position.x;
      imagesRight[i].position.y=imagesRight[0].position.y;
      PIEaddElement(imagesRight[i]);
    }
    else
    {
      imagesRight[i].position.x=(Math.round(coords[0]*1000)/1000);
      imagesRight[i].position.y=(Math.round(coords[1]*1000)/1000);
      PIEaddElement(imagesRight[i]);
    }
  }
  var ImageNumber;
  angleLeft=PIEgetInputSlider("Angle btw Mirror:")/2;
  angleRight=PIEgetInputSlider("Angle btw Mirror:")/2;
  //document.getElementById("hello").innerHTML="<h2>Angle between the mirrors "+(angleLeft+angleRight)+".</h2>";
  if((angleLeft+angleRight)==0)
  {
      document.getElementById("hello").innerHTML="<h2>Number of Images Formed is infinite.</h2>";
  }
  else
  {
    ImageNumber=360/(angleLeft+angleRight)-1;
    document.getElementById("hello").innerHTML="<h2>Number of Images Formed is "+Math.round(ImageNumber*100)/100+".</h2>";
  }
  PIErender();
}

function resetExperiment()
{
  if(turn==0)
  {
    leftMirror.position.x=-halfLength*Math.cos(45*Math.PI/180);
    leftMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
    leftMirror.rotation.z=45*Math.PI/180;

    rightMirror.position.x=halfLength*Math.cos(45*Math.PI/180);
    rightMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
    rightMirror.rotation.z=-45*Math.PI/180;

    circle.position.x=0;
    circle.position.y=5;

    for(var i=ray1.length-1;i>=0;i--)
      {
        PIEremoveElement(ray1[i]);
        ray1.pop();
      }
    for(var i=imagesFromLeft.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesFromLeft[i]);
      imagesFromLeft.pop();
    }
    for(var i=imagesFromRight.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesFromRight[i]);
      imagesFromRight.pop();
    }
    for(var i=imagesLeft.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesLeft[i]);
      imagesLeft.pop();
    }
    for(var i=imagesRight.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesRight[i]);
      imagesRight.pop();
    }

    document.getElementById("hello").innerHTML="<h2></h2>";
    PIEchangeInputSlider("Angle btw Mirror:",90);
    //PIEchangeInputSlider("Rotate Right Mirror:",45);
    PIErender();
    //document.getElementById("hello").innerHTML="<h2></h2>";
  }
  else {
    leftMirror.position.x=-halfLength*Math.cos(45*Math.PI/180);
    leftMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
    leftMirror.rotation.z=45*Math.PI/180;

    rightMirror.position.x=halfLength*Math.cos(45*Math.PI/180);
    rightMirror.position.y=halfLength*Math.sin(45*Math.PI/180);
    rightMirror.rotation.z=-45*Math.PI/180;

    circle.position.x=0;
    circle.position.y=5;
    document.getElementById("hello").innerHTML="<h2></h2>";

  }
  for(var i=animateRay.length-1;i>=0;i--)
  {
    PIEremoveElement(animateRay[i]);
    animateRay.pop();
  }
  for(var i=imagesFromLeft.length-1;i>=0;i--)
  {
    PIEremoveElement(imagesFromLeft[i]);
    imagesFromLeft.pop();
  }
  for(var i=imagesFromRight.length-1;i>=0;i--)
  {
    PIEremoveElement(imagesFromRight[i]);
    imagesFromRight.pop();
  }
  lastOn=0;
}

var helpContent;
//Help content
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>A Multiple images with hinged mirrors</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows the multiple images formation with hinged mirrors.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see 2 mirrors,a object(shown by yellow color) and ray diagrams and the images formed(shown by red color)</p>";
    helpContent = helpContent + "<h4>The rules of the experiment are given below:</h4>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>The incident ray is shown in red colour.";
    helpContent = helpContent + "<li>The reflected ray is shown in green colour.";
    helpContent = helpContent + "<li>The backward traced ray is shown in pink colour.(Virtual image formation)";
    helpContent = helpContent + "<li>When the demo mode is clicked,the rays diagram starts to form (animate)";
    //helpContent = helpContent + "<li>Demo mode does nothing when the rotate mirror check box is checked";
    //helpContent = helpContent + "<li>After the successful image formation,user can click on the rotate mirror check box to enable rotation of mirror.";
    helpContent = helpContent + "<li>Change the angle between the mirrors by using the slider and it can only be changed,when the rotate mirror check box is checked";
    helpContent = helpContent + "<li>The range of slider is from 10 to 180.";
    helpContent = helpContent + "<li>The slider will be changed such that 360 is divisible by the angle between mirrors(from slider).";
    helpContent = helpContent + "<li>Keep the angle(A) between the mirror so that angle(A) can divide 360.";
    helpContent = helpContent + "<li>The number of images formed can be seen.";
    helpContent = helpContent + "<li>On clicking on the Note Reading on the control panel,the reading can be noted in the observation table";
    helpContent = helpContent + "<li>Duplicate reading can't be recorded in the observation table.";
    helpContent = helpContent + "<li>On clicking on the Clear Table on the control panel,the reading can be cleared from the observation table";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<h3>The Animation stage</h3>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>On clicking on the start button,the rays starts to form (animate)";
    helpContent = helpContent + "<li>On clicking on the left arrow button,animation speed can be decreased";
    helpContent = helpContent + "<li>On clicking on the right arrow button,animation speed can be increased";
    helpContent = helpContent + "<li>On clicking on the stop button,animation can be stopped";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>The images are shown in red color and object is shown in yellow color.</p>";
    //helpContent = helpContent + "<p>The steps written can also be seen as the image forms via animation from the demo mode.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}
//Initialise Info
var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>A Multiple images with hinged mirrors</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows the multiple images formation with hinged mirrors.</p>";
    infoContent = infoContent + "<p>The red line shows the incident ray.</p>";
    infoContent = infoContent + "<p>The green line shows the incident ray.</p>";
    infoContent = infoContent + "<p>The pink line shows the traced ray in backward direction (virtual image formation).</p>";
    infoContent = infoContent + "<p>The Number of images formed is (360/A)-1 where A is angle between the mirrors.</p>";
    infoContent = infoContent + "<p>The angle A must be choosen so that 360 is divisible by A.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}
