define(['lib/Noodlebox3D'], function(N3D) {

	function Avatar( avatarSettings ) {

	    // temp solution for matt

	    this.description = {
	        streams:[
	            { uid:-1, label:"Audio Input", description:"" },
	            { uid:1, label:"Motion Manchester", description:"" },
	            { uid:2, label:"Motion Manchester2", description:"" },
	            { uid:3, label:"Motion Liverpool", description:"" },
	            { uid:4, label:"Motion London", description:"" },
	            { uid:5, label:"Twitter", description:"" },
	            { uid:6, label:"Strava", description:"" }
	        ]
	    };

	    //

	    var my = this;

	    // create canvas if not exist

	    if (avatarSettings.canvas==undefined) {

	        this.canvas = document.createElement( 'canvas' );

	    } else {

	        this.canvas = avatarSettings.canvas;

	    }

	    if (avatarSettings.width) this.canvas.width = avatarSettings.width;
	    if (avatarSettings.height) this.canvas.height = avatarSettings.height;

	    //

	    var test = false;

	    try {

	        if ( window.WebGLRenderingContext) {
	            test = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
	        }

	    } catch(e) {

	        test = false;

	    }

	    if (!test) {

	        if (avatarSettings.webglFailCallback) avatarSettings.webglFailCallback(this);

	        return false;

	    } else {

	        if (test.getParameter(test.MAX_VERTEX_TEXTURE_IMAGE_UNITS)==0) {

	            if (avatarSettings.webglFailCallback) avatarSettings.webglFailCallback(this);

	            return false;

	        }

	    }

	    //

	    this.testMode = avatarSettings.testMode;

	    this.dataTextureURL = avatarSettings.dataTextureURL;
	    if (avatarSettings.testDataURL!="") { this.dataTextureURL = avatarSettings.testDataURL; }

	    this.highlightTextureURL = avatarSettings.highlightTextureURL;
	    this.sheenTextureURL = avatarSettings.sheenTextureURL;
	    this.logoTextureURL = avatarSettings.logoTextureURL;

	    // state

	    this.time = 0;
		this.dataFade = 0;
	    this.frame = 0;
	    this.mode = "normal"; // "camera" or "audio"

	    this.recordToImageFlag = false;
	    this.recording = false;
	    this.recordedFrames = [];

	    this.paused = false;

	    this.seededRandom = new N3D.SeededRandom(avatarSettings.seed);

	    this.audioLevelsCount = 32;
	    this.audioLevelsData = [];
	    this.audioLevel = 0;

	    // settings

	    this.numberOfRibs = 4 ;
	    this.resolution = avatarSettings.resolution||1;
	    this.cameraOverlayFlag = avatarSettings.cameraOverlayFlag;
	    this.logoOverlayFlag = avatarSettings.logoOverlayFlag;
	    this.scale = avatarSettings.scale;
	    this.loopFlag = avatarSettings.loopFlag;
	    this.x = avatarSettings.x;
	    this.y = avatarSettings.y;
	    this.swing = avatarSettings.swing;
	    this.angle = avatarSettings.angle;
	    this.dataSpeed = avatarSettings.dataSpeed;
	    this.frames = avatarSettings.frames||10000;
	    this.serverMode = avatarSettings.serverMode;
	    this.backgroundColor = avatarSettings.backgroundColor||[0,0,0];
	    this.width = avatarSettings.width || this.canvas.width;
	    this.height = avatarSettings.height || this.canvas.height;
	    this.inputErrorCallback = avatarSettings.inputErrorCallback;
	    this.inputSuccessCallback = avatarSettings.inputSuccessCallback;
	    this.geometryReadyCallback = avatarSettings.geometryReadyCallback;
	    this.graphWidth = avatarSettings.graphWidth || 100;
	    this.autoRender = (avatarSettings.autoRender==undefined) ? true : avatarSettings.autoRender;
	    this.dataInterval = avatarSettings.dataInterval || 60000;
	    this.dataTextureWidth = 512/2;
	    this.avatarBuffers = [];
	    this.autoCalculateGeometry = (avatarSettings.autoCalculateGeometry==undefined) ? true : avatarSettings.autoCalculateGeometry;
	    this.workerURL = avatarSettings.workerURL || 'js/avatar-worker.js';
	    this.graphs = [];

	    // matrix geometry

	    this.avatarMVMatrix = N3D.mat4.create();
	    this.avatarPMatrix = N3D.mat4.create();
	    this.avatarFMatrix = N3D.mat4.create();

	    //

	    this.gl = N3D.init( this.canvas , avatarSettings.transparentFlag , true , true , true);

	    this.gl.clearColor( this.backgroundColor[0] , this.backgroundColor[1] , this.backgroundColor[2] , (avatarSettings.transparentFlag)? 0.0 : 1.0 );

	    N3D.mat4.perspective( this.avatarPMatrix , Math.PI/2 , this.gl.viewportWidth/this.gl.viewportHeight , 0.1 , 10.0 );

	    this.gl.enable(this.gl.BLEND);

	    if (avatarSettings.gradientTextureURL) { this.avatarBackground = new AvatarBackground( this.gl, this, avatarSettings.gradientTextureURL ); }

	    if (document.getElementById("avatar-offset-shader-vs")) {

	            this.avatarProgram = N3D.compileProgram( this.gl, "avatar-offset-shader-vs", "avatar-offset-shader-fs" );

	    } else {

	            this.avatarProgram = N3D.compileProgram( this.gl, Avatar.AvatarVertexShader, Avatar.AvatarFragmentShader);

	    }

	    this.distorters = [];

	    this.avatarBuffers = [];

	    this.blankTexture = N3D.createTextureFromURL(this.gl, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY5NEQ4MzkwMEVDNDExRTU5MEFEQkJFMEExQTBBNDAyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY5NEQ4MzkxMEVDNDExRTU5MEFEQkJFMEExQTBBNDAyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njk0RDgzOEUwRUM0MTFFNTkwQURCQkUwQTFBMEE0MDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njk0RDgzOEYwRUM0MTFFNTkwQURCQkUwQTFBMEE0MDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ZQNABAAAADklEQVR42mJgQAYAAQYAAA4AAbELNUIAAAAASUVORK5CYII=", true,this.gl.LINEAR,this.gl.LINEAR,false);

	    //

	    if (this.logoTextureURL) this.logoTexture = N3D.createTextureFromURL(this.gl, this.logoTextureURL, true,this.gl.LINEAR,this.gl.LINEAR,false);

	    this.highlightTexture = N3D.createTextureFromURL(this.gl, this.highlightTextureURL, false,this.gl.LINEAR,this.gl.LINEAR,false);

	    this.sheenTexture = N3D.createTextureFromURL(this.gl, this.sheenTextureURL, true,this.gl.LINEAR,this.gl.LINEAR,false);

	    //

	    this.mergedDataTexture = N3D.createRenderableTexture(this.gl,this.dataTextureWidth,false,false,this.gl.LINEAR,this.gl.LINEAR,false);

	    this.dataTextures = [];

	    this.getLatestDataTexture();

	    //

	    if (this.autoCalculateGeometry) this.calculateGeometry();

	    //

	    if (this.dataInterval != -1) {

	    	setInterval(function(){

	    	    // request new data texture image

	    	    if (!my.paused) { my.getLatestDataTexture() }

	    	} , this.dataInterval );

	    }

		//

	    function runAvatar() {

	        if (!my.paused) {

	            if (!my.serverMode) {

	                // draw avatar

	                my.render();

	                if (my.recordToImageFlag) { my.saveImage(); }

	                if (my.recording&&my.recordedFrames.length<my.frames) { my.saveFrame(); }

	            }

	            //

	            my.frame ++ ;

	            my.time += 1/my.frames;
	            if ( my.time >= 1 ) { my.time--; }

	        }

	        if (my.autoRender) requestAnimFrame(runAvatar);

	    }

	    //

	    if (my.serverMode) { setInterval(function(){ my.render(); } , 60000); }

	    if (this.autoRender) { requestAnimFrame(runAvatar); }

	    //

	    if (avatarSettings.webglSuccessCallback) avatarSettings.webglSuccessCallback(this);

	}

	Avatar.prototype.registerGraph = function( data ) {

	    // uid, dom

	    if (data.uid==1) this.graphs.push( new AvatarGraph(  data.element , this , 0, 0 ) );
	    if (data.uid==2) this.graphs.push( new AvatarGraph(  data.element , this , 1, 0 ) );
	    if (data.uid==3) this.graphs.push( new AvatarGraph(  data.element , this , 2, 0 ) );
	    if (data.uid==4) this.graphs.push( new AvatarGraph(  data.element , this , 0 + this.dataTextureWidth*2*this.dataTextureWidth, 1 ) );
	    if (data.uid==5) this.graphs.push( new AvatarGraph(  data.element , this , 1 + this.dataTextureWidth*2*this.dataTextureWidth, 1 ) );
	    if (data.uid==6) this.graphs.push( new AvatarGraph(  data.element , this , 2 + this.dataTextureWidth*2*this.dataTextureWidth, 1 ) );

	    if (data.uid==-1) { this.graphs.push ( new AvatarGraph(  data.element , this , -1,-1 ) ); }

	    if (!this.dataTextureCanvas) {
	        this.dataTextureCanvas = document.createElement( 'canvas' );
	        this.dataTextureCanvas.width = this.dataTextureWidth;
	        this.dataTextureCanvas.height = this.dataTextureWidth;
	        this.dataTextureCanvas.context = this.dataTextureCanvas.getContext('2d');
	    }

	}

	Avatar.prototype.receiveGeometry = function(data) {

	    var vertexBuffer = N3D.createStaticBufferSet(
	        this.gl,
	        data.vertices,
	        data.count,
	        data.indexes,
	        [ ["aVertexCorner",3,this.gl.FLOAT] ,
	        ["aVertexPosition",3,this.gl.FLOAT] ,
	        ["aVertexUV",2,this.gl.FLOAT],
	        ["aVertexNormal",2,this.gl.FLOAT],
	        ["aVertexPowers1",4,this.gl.FLOAT],
	        ["aVertexPowers2",4,this.gl.FLOAT] ]
	        );

	    this.avatarBuffers=[vertexBuffer];

	    if (this.geometryReadyCallback) this.geometryReadyCallback(this);

	}

	Avatar.prototype.getLatestDataTexture = function() {

	    var my = this;

	    var texture = N3D.createTexture(my.gl,8,false, my.gl.LINEAR, my.gl.LINEAR, false);

	    var textureImage = new Image();

	    textureImage.crossOrigin = "anonymous";

	    texture.loaded = false;

	    textureImage.onload = function(){

	        console.log("Recieved New Data Image");

	        N3D.copyImageToTexture(my.gl,texture,this);

	        my.dataTextures.push ( texture );

	        if (my.dataTextureCanvas) {

	            my.dataTextureCanvas.context.drawImage(this,0,0);

	            var tempImageData = my.dataTextureCanvas.context.getImageData( 0, 0, my.dataTextureWidth, my.dataTextureWidth );

	            my.imageData = tempImageData.data;

	        }

	        texture.loaded = true;

	        this.onload = null;

	    };

	    textureImage.src = my.dataTextureURL;

	    return texture;

	}

	Avatar.prototype.setMode = function( mode ) {

	    //console.log("Attempting to change to = "+mode);

	    if (mode=="camera") {

	        this.mode = "camera";

	        if (this.videoCamera==undefined) {

	            this.videoCamera = this.initCamera(800,600);

	            //

	            if (this.videoTextures==undefined) {

	                this.videoTextures = N3D.createDoubleTexture(this.gl,8);

	                this.movementTexture = N3D.createRenderableTexture(this.gl,64,false,false,this.gl.LINEAR,this.gl.LINEAR,true);

	                this.trackingBuffer = N3D.createDoubleRenderableTexture(this.gl,64,false,false,this.gl.LINEAR,this.gl.LINEAR,true);

	            }

	            if (this.blurBuffer==undefined) this.blurBuffer = N3D.createDoubleRenderableTexture(this.gl,64,false,false,this.gl.LINEAR,this.gl.LINEAR,true);

	            //

	            this.videoCanvas = document.createElement( 'canvas' );
	            this.videoCanvas.width = 512;
	            this.videoCanvas.height = 512;

	            this.videoCanvasContext = this.videoCanvas.getContext('2d');
	            this.videoCanvasContext.translate(512,0);
	            this.videoCanvasContext.scale(-0.8,1.08);

	            N3D.copyImageToTexture(this.gl, this.videoTextures[0], this.videoCanvas);
	            N3D.copyImageToTexture(this.gl, this.videoTextures[1], this.videoCanvas);

	        }

	    }

	    if (mode=="audio") {

	        var my = this;

	        this.mode = "audio";

	        if (this.audioContext==undefined) {

	            if (this.spectrumTextures==undefined) this.spectrumTextures = N3D.createDoubleRenderableTexture(this.gl, 64, false, false, this.gl.LINEAR, this.gl.LINEAR, true);

	            if (this.blurBuffer==undefined) this.blurBuffer = N3D.createDoubleRenderableTexture(this.gl,64,false,false,this.gl.LINEAR,this.gl.LINEAR,true);

	            this.audioContext = new window.AudioContext();

	            function initAudio(stream) {

	                stream.avatarDevice = "microphone";

	                my.audioStream = stream;

	                if (my.inputSuccessCallback) { my.inputSuccessCallback(my,stream); }

	                for(var i = 0; i < my.audioLevelsCount; i++) {
	                    my.audioLevelsData[i] = 0;
	                }

	                var microphone = my.audioContext.createMediaStreamSource(stream);
	                var analyser = my.audioContext.createAnalyser();

	                analyser.fftSize = 1024;
	                analyser.smoothingTimeConstant = 0.3;

	                microphone.connect(analyser);

	                my.audioArray = new Uint8Array(analyser.frequencyBinCount);

	                stream.intervalLoop = window.setInterval(function(){

	                    analyser.getByteFrequencyData(my.audioArray);

	                },50);

	            }

	            navigator.getUserMedia({audio: true}, initAudio, function(error) {

	                error.avatarDevice = "microphone";

	                if (my.inputErrorCallback) { my.inputErrorCallback(my,error); }

	            });

	        }

	    }

	    if (mode=="normal") {

	        this.mode = "normal";

	    }

	}


	Avatar.prototype.closeMicrophoneAndCamera = function() {

	        this.audioContext = undefined;
	        this.videoCamera = undefined;

	        if (this.cameraStream) {
	            this.cameraStream.stop();
	            this.cameraStream=null;
	        }

	        if (this.audioStream) {
	            this.audioStream.stop();
	            window.clearInterval(this.audioStream.intervalLoop);
	            this.audioStream = null;
	        }

	        this.setMode("normal");

	}


	Avatar.prototype.initCamera = function(width,height) {

	    var my = this;

	    var video = document.createElement("video");
	    video.setAttribute("width", width);
	    video.setAttribute("height", height);
	    video.width = width;
	    video.height = height;

	    var initVideo = function() { video.removeEventListener('playing', initVideo, false); setTimeout(function(){ video.ready = true; },1000); };

	    video.addEventListener('playing', initVideo, false);

	    if (navigator.getUserMedia) {
	        navigator.getUserMedia({video: true, toString: function(){return 'video';}}, cameraSuccessCallback, cameraErrorCallback);
	    } else {
	        cameraErrorCallback();
	    }

	    function cameraSuccessCallback(stream) {

	        stream.avatarDevice = "camera";

	        if (my.inputSuccessCallback) { my.inputSuccessCallback(my,stream); }

	        if (video.mozCaptureStream) {
	            video.mozSrcObject = stream;
	        } else {
	            video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
	        }

	        my.cameraStream = stream;

	        video.play();

	    }

	    function cameraErrorCallback(error) {

	        error.avatarDevice = "camera";

	        if (my.inputErrorCallback) my.inputErrorCallback(my,error);

	    }

	    return video;

	}

	Avatar.prototype.calculateGeometry = function(){

	    this.avatarBuffers = [];

	    /*

	    for (var i = 0; i < this.numberOfRibs*2; i++) {

	        var object = {};

	        var pos = vec3.fromValues( this.seededRandom.nextFloat() - 0.5 , this.seededRandom.nextFloat() - 0.5 , this.seededRandom.nextFloat() - 0.5 );
	        vec3.normalize(pos,pos);

	        object.loc = pos;
	        object.power = this.seededRandom.nextFloat() * 3 + 1;
	        object.v = this.seededRandom.nextFloat()*2-1;

	        this.distorters.push(object);

	    };

	    for (var i = 0; i < this.resolution; i++) {

	        this.avatarBuffers.push( this.calculateArmBufferSegment(i/this.resolution,(i+1)/this.resolution) );

	    };

	    */

	    var my = this;

	    this.geometryWorker = new Worker(this.workerURL);

	    this.geometryWorker.addEventListener('message', function(e) { my.receiveGeometry(e.data) }, false);

	    this.geometryWorker.postMessage("");

	}


	Avatar.prototype.handleDataTexture = function() {

	    // Tween data texture between current and last

	    //

	    N3D.enableRenderToTexture(this.gl, this.mergedDataTexture);

	        this.gl.blendFunc(this.gl.ONE,this.gl.ZERO);
	        this.gl.blendEquation(this.gl.FUNC_ADD);

	        N3D.textureFillFilter(this.gl, this.dataTextures[0]);

	        if ((this.dataTextures.length>1)&&(this.dataTextures[1].loaded)) {

	            this.gl.blendFunc(this.gl.CONSTANT_ALPHA,this.gl.ONE_MINUS_CONSTANT_ALPHA);

	            this.gl.blendColor(1.000, 1.0, 1.0, this.dataFade);

	            N3D.textureFillFilter(this.gl, this.dataTextures[1]);

	            this.dataFade += (this.serverMode) ? 0.5 : 0.01;
	            if (this.dataFade>=1) {
	                this.dataFade = 0;
	                N3D.deleteTexture( this.gl, this.dataTextures.shift() );
	            }

	        }

	    N3D.disableRenderToTexture(this.gl);

	}

	Avatar.prototype.handleCamera = function() {

	    try {

	        if ( this.videoCamera.readyState === this.videoCamera.HAVE_ENOUGH_DATA ) {

	            this.videoCanvasContext.drawImage(this.videoCamera,0,0);
	            N3D.copyImageToTexture(this.gl,this.videoTextures[this.videoTextures.current],this.videoCanvas);

	            this.videoTextures.flip();

	        }

	    } catch(e) {}



	    // create difference / movement texture by differencing current cam image and last

	    //

	    N3D.enableRenderToTexture(this.gl, this.movementTexture);

	        this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
	        this.gl.blendEquation(this.gl.FUNC_REVERSE_SUBTRACT);

	        N3D.flatFill(this.gl,new Float32Array([1/255.00,1/255.00,1/255.00,0.00]));

	        //

	        this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
	        this.gl.blendEquation(this.gl.FUNC_ADD);

	        if (this.videoCamera.ready) N3D.differenceFilter( this.gl, this.videoTextures[0], this.videoTextures[1], new Float32Array( [-0.1,8.2] ) );

	    N3D.disableRenderToTexture(this.gl);



	    // create tracking buffer

	    //

	    N3D.enableRenderToTexture(this.gl, this.trackingBuffer[this.trackingBuffer.current]);

	        this.gl.blendFunc(this.gl.ONE, this.gl.ZERO);
	        N3D.trackingFilter(this.gl, this.trackingBuffer[this.trackingBuffer.notCurrent], this.movementTexture, new Float32Array( [-4/255,8/255]));

	    N3D.disableRenderToTexture(this.gl, this.trackingBuffer[this.trackingBuffer.current]);



	    // blur tracking buffer

	    //

	    this.gl.blendFunc(this.gl.ONE, this.gl.ZERO);

	    N3D.enableRenderToTexture(this.gl, this.blurBuffer[1]);

	        N3D.horizontalBlurFilter(this.gl, this.trackingBuffer[this.trackingBuffer.current],1/this.blurBuffer[0].width);

	    N3D.disableRenderToTexture(this.gl, this.blurBuffer[1]);

	    N3D.enableRenderToTexture(this.gl, this.blurBuffer[0]);

	        N3D.verticalBlurFilter(this.gl, this.blurBuffer[1],1/this.blurBuffer[0].width);

	    N3D.disableRenderToTexture(this.gl, this.blurBuffer[0]);

	    N3D.enableRenderToTexture(this.gl, this.blurBuffer[1]);

	        N3D.horizontalBlurFilter(this.gl, this.blurBuffer[0],1/this.blurBuffer[0].width);

	    N3D.disableRenderToTexture(this.gl, this.blurBuffer[1]);

	    N3D.enableRenderToTexture(this.gl, this.blurBuffer[0]);

	        N3D.verticalBlurFilter(this.gl, this.blurBuffer[1],1/this.blurBuffer[0].width);

	    N3D.disableRenderToTexture(this.gl, this.blurBuffer[0]);


	}


	Avatar.prototype.handleAudio = function() {

	    if (this.audioArray==undefined) return;

	    for(var i = 0; i < this.audioLevelsCount; i++) { this.audioLevelsData[i] = 0; }

	    for(var i = 0; i < 512; i++) {
	        this.audioLevelsData[Math.floor(i/16)] += this.audioArray[i]/256.00/16;
	    }

	    this.audioLevel = 0;

	    for(var i = 0; i < this.audioLevelsCount; i++) { this.audioLevel += this.audioLevelsData[i]; }

	    this.audioLevel /= this.audioLevelsCount;

	    //

	    N3D.enableRenderToTexture(this.gl, this.spectrumTextures[this.spectrumTextures.current]);

	        this.gl.disable(this.gl.DEPTH_TEST);

	        this.gl.blendFunc(this.gl.ONE,this.gl.ZERO);

	        N3D.audioSpectrumFilter( this.gl, this.spectrumTextures[this.spectrumTextures.notCurrent], this.audioLevelsData );

	        this.spectrumTextures.flip();

	    N3D.disableRenderToTexture(this.gl);

	    this.gl.bindTexture(this.gl.TEXTURE_2D, this.spectrumTextures[this.spectrumTextures.notCurrent]);
	    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
	    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

	    // blur tracking buffer

	    //

	    this.gl.blendFunc(this.gl.ONE, this.gl.ZERO);

	    N3D.enableRenderToTexture(this.gl, this.blurBuffer[1]);

	        N3D.horizontalBlurFilter(this.gl, this.spectrumTextures[this.spectrumTextures.notCurrent],1/this.spectrumTextures[this.spectrumTextures.notCurrent].width);

	    N3D.disableRenderToTexture(this.gl, this.blurBuffer[1]);

	    N3D.enableRenderToTexture(this.gl, this.blurBuffer[0]);

	        N3D.verticalBlurFilter(this.gl, this.blurBuffer[1],1/this.blurBuffer[0].width);

	    N3D.disableRenderToTexture(this.gl, this.blurBuffer[0]);

	    N3D.enableRenderToTexture(this.gl, this.blurBuffer[1]);

	        N3D.horizontalBlurFilter(this.gl, this.blurBuffer[0],1/this.blurBuffer[0].width);

	    N3D.disableRenderToTexture(this.gl, this.blurBuffer[1]);

	    N3D.enableRenderToTexture(this.gl, this.blurBuffer[0]);

	        N3D.verticalBlurFilter(this.gl, this.blurBuffer[1],1/this.blurBuffer[0].width);

	    N3D.disableRenderToTexture(this.gl, this.blurBuffer[0]);

	}


	Avatar.prototype.render = function(){

	    var virtualTime = this.time;

	    if (this.loopFlag) virtualTime = (Math.cos(this.time*Math.PI*2))*0.007*this.dataSpeed;


	    //

	    this.handleDataTexture();

	    if (this.mode=="camera") this.handleCamera();

	    if (this.mode=="audio") this.handleAudio();



	    // graphs

	    for (var i = this.graphs.length - 1; i >= 0; i--) { this.graphs[i].render(); };



	    // start drawing to screen

	    N3D.clear(this.gl);


	    // draw gradients

	    if (this.avatarBackground!=undefined) this.avatarBackground.render( (this.loopFlag) ? virtualTime*0.5 : undefined );


	    // draw avatar


	    N3D.mat4.identity(this.avatarMVMatrix);

	    N3D.mat4.translate(this.avatarMVMatrix, this.avatarMVMatrix, [this.x, this.y, -1.7]);

	    N3D.mat4.scale(this.avatarMVMatrix,this.avatarMVMatrix,[this.scale,this.scale,this.scale]);

	    if (this.loopFlag) {

	        N3D.mat4.rotate(this.avatarMVMatrix, this.avatarMVMatrix, (Math.cos(this.time*Math.PI*2))*this.swing + this.angle * Math.PI * 2 / 360, [0, 1, 0]);

	    } else {

	        N3D.mat4.rotate(this.avatarMVMatrix, this.avatarMVMatrix, this.time*Math.PI*2*4*this.swing + this.angle * Math.PI * 2 / 360, [0, 1, 0]);
	        //N3D.mat4.rotate(this.avatarMVMatrix, this.avatarMVMatrix, Math.PI/2, [0, 1, 0]);

	    }

	    N3D.mat4.multiply(this.avatarFMatrix,this.avatarPMatrix,this.avatarMVMatrix);

	    //

	    this.gl.enable(this.gl.CULL_FACE);

	    this.gl.cullFace(this.gl.FRONT);

	    this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);

	    this.gl.enable(this.gl.DEPTH_TEST);

	    if (this.avatarBuffers.length!=0) {

	        // they all have identical index buffers

	        N3D.startProgram(this.gl, this.avatarProgram, undefined, this.avatarBuffers[0].indexBuffer);

	            for (var i = 0; i < this.avatarBuffers.length; i++) {

	                var avatarVertexBuffer = this.avatarBuffers[i];

	                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, avatarVertexBuffer);

	                N3D.vertexAttribPointer(this.gl, this.avatarProgram, "aVertexPosition", avatarVertexBuffer);
	                N3D.vertexAttribPointer(this.gl, this.avatarProgram, "aVertexCorner", avatarVertexBuffer);
	                N3D.vertexAttribPointer(this.gl, this.avatarProgram, "aVertexUV", avatarVertexBuffer);
	                N3D.vertexAttribPointer(this.gl, this.avatarProgram, "aVertexPowers1", avatarVertexBuffer);
	                N3D.vertexAttribPointer(this.gl, this.avatarProgram, "aVertexPowers2", avatarVertexBuffer);
	                N3D.vertexAttribPointer(this.gl, this.avatarProgram, "aVertexNormal", avatarVertexBuffer);

	                N3D.samplerPointer(this.gl, this.avatarProgram, "uDataSampler", 0, this.mergedDataTexture);
	                N3D.samplerPointer(this.gl, this.avatarProgram, "uHighlightSampler", 2, this.highlightTexture);
	                N3D.samplerPointer(this.gl, this.avatarProgram, "uSheenSampler", 3, this.sheenTexture);

	                if (this.mode=="camera") N3D.samplerPointer(this.gl, this.avatarProgram, "uMovementSampler", 1, this.blurBuffer[0]);
	                if (this.mode=="normal") N3D.samplerPointer(this.gl, this.avatarProgram, "uMovementSampler", 1, this.blankTexture);
	                if (this.mode=="audio") N3D.samplerPointer(this.gl, this.avatarProgram, "uMovementSampler", 1, this.blurBuffer[0]);// this.spectrumTextures[this.spectrumTextures.notCurrent]);

	                N3D.matrixPointer(this.gl, this.avatarProgram, "ufMatrix", this.avatarFMatrix);

	                N3D.setUniformFloat(this.gl,this.avatarProgram.p_uTime, new Float32Array([virtualTime]));

	                this.gl.drawElements(this.gl.TRIANGLES, this.avatarBuffers[0].indexBuffer.numberOfIndexes, this.gl.UNSIGNED_SHORT, 0);

	            }

	        N3D.endProgram(this.gl);

	    }

	    this.gl.disable(this.gl.DEPTH_TEST);

	    this.gl.disable(this.gl.CULL_FACE);



	    //if (N3D.crashtestFilter) N3D.crashtestFilter(this.gl);


	    // draw logo

	    //

	    if (this.logoOverlayFlag) {

	        this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);

	        N3D.textureFillFilter(this.gl, this.logoTexture);

	    }


	    // draw camera etc for debug

	    //


	    this.gl.blendFunc(this.gl.ONE,this.gl.ONE);

	    if (this.cameraOverlayFlag) {

	        N3D.textureFillFilter(this.gl, this.blurBuffer[0]);

	      //  N3D.textureFillFilter(this.gl, this.spectrumTextures[this.spectrumTextures.notCurrent]);

	    }


	    //

	    if (this.trackingBuffer!=undefined) this.trackingBuffer.flip();

	    //

	    if (this.imageReadyCallback) this.imageReadyCallback();

	}


	Avatar.prototype.sleep = function() {

	    this.paused = true;

	}


	Avatar.prototype.wake = function() {

	    this.paused = false;

	}


	Avatar.prototype.saveImage = function() {

	    this.recordToImageFlag = false;

	    this.gl.finish();

	    if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) == this.gl.FRAMEBUFFER_COMPLETE) {

	        var img = new Image();
	        img.src = this.canvas.toDataURL();

	        $(img).attr({width:1000,height:1000,title:"SavedImage"});

	        $("body").append(img);

	    }

	}




	Avatar.prototype.saveFrame = function(){

	    this.gl.finish();

	    if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) == this.gl.FRAMEBUFFER_COMPLETE) {

	        this.recordedFrames.push( this.canvas.toDataURL() );

	        console.log(this.recordedFrames.length);

	        if (this.recordedFrames.length==this.frames) this.finishRecording();

	    }

	}




	Avatar.prototype.startRecording = function(){

	    this.recording = true;
	    this.frame = 0;
	    this.time = 0;

	}



	Avatar.prototype.finishRecording = function(){

	    console.log("created");

	    var l = this.recordedFrames.length;

	    var totalRecording = "";

	    for (var i = 0; i<l; i++) {

	        if (i==0) {
	            totalRecording = this.recordedFrames.shift();
	        } else {
	            totalRecording += "xdannyx" + this.recordedFrames.shift();
	        }

	    };

	    console.log("compiled");

	    var blob = new Blob([totalRecording], {type: "text/plain;charset=utf-8"});
	    saveAs(blob, "recording.txt");

	    blob = undefined;

	    this.recordedFrames = [];
	    this.recording = false;

	    totalRecording = "";

	    console.log("Saved");

	}


	Avatar.prototype.deferredResize = function (width,height,optionalX,optionalY) {

	    if (this.resizeTimeout != undefined) clearTimeout(this.resizeTimeout);

	    var my = this;

	    this.resizeTimeout = setTimeout( function() { my.resize(width,height,optionalX,optionalY) }, 500 );

	}

	Avatar.prototype.resize = function (width,height,optionalX,optionalY) {

	    if ((width!=this.canvas.width)||(height!=this.canvas.height)) {

	        if ((width!=0)&&(height!=0)) {

	            this.width = width;
	            this.height = height;

	            this.canvas.width = this.width;
	            this.canvas.height = this.height;

	            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

	            this.gl.viewportWidth = this.gl.drawingBufferWidth;
	            this.gl.viewportHeight = this.gl.drawingBufferHeight;

	            N3D.mat4.perspective( this.avatarPMatrix , 45 , this.gl.viewportWidth/this.gl.viewportHeight , 0.1 , 10.0 );

	            this.resizeTimeout = undefined;

	        }
	    }

	    if (optionalX!=undefined) this.x = optionalX;
	    if (optionalY!=undefined) this.y = optionalY;

	    console.log(width,height,optionalX,optionalY);

	}









	function sCurve(input) { return Math.sin((input-0.5)*Math.PI)*0.5+0.5; }

	function fract(input) { return input-Math.floor(input); }

	function clamp(input, min, max) {return (input<min)?min:(input>max)?max:input; }

	function npow(n,power) { return Math.pow(n,power)*((n>0)? 1:-1); }

	function spike(n, location, radius) {return (Math.abs(n-location)<radius) ? 1-(Math.abs(n-location)/radius) : 0;}

	function sign(n) { return (n==0)?0:(n>0)?1:-1; }

	function wave(n) {return 0.5-Math.cos(n*Math.PI*2)*0.5; }







	function AvatarGraph(domElement, avatar, offset, type) {

	    var my = this;

	    this.domElement = domElement;

	    this.avatar = avatar;

	    this.dataOffset = offset;

	    this.type = type;

	    this.value = 0;

	};

	AvatarGraph.prototype.render = function(){

	    if (this.avatar.paused) return;

	    if (!this.avatar.imageData) return;

	    var w = 100;

	    var tf = fract(this.avatar.time);

	    if (this.type==-1) {

	        // special case - audio

	        this.domElement.style.width=this.avatar.audioLevel*this.avatar.graphWidth+"%";

	        return;

	    }

	    var dataWidth = this.avatar.dataTextureWidth;

	    if (this.type==0) {

	        var t=Math.sin(tf*Math.PI*2)*0.25+0.25;

	        var result=0;
	        var temp=0;

	        for (var x = 0; x < w; x++) {

	            temp = this.avatar.imageData[Math.floor(x/w*dataWidth)*4+this.dataOffset+Math.floor(t*256)*dataWidth*4+Math.floor(tf*dataWidth)*4]/dataWidth;
	            if (temp>result) result=temp;

	        };

	        this.value += (result - this.value)*0.1;

	        this.domElement.style.width=this.value*this.avatar.graphWidth+"%";

	    } else {

	        var t=Math.cos(tf*Math.PI*2)*0.25+0.25;

	        var result=0;
	        var temp=0;

	        for (var x = 0; x < w; x++) {

	            temp = this.avatar.imageData[Math.floor(x/w*dataWidth)*4+this.dataOffset+Math.floor(t*256)*dataWidth*4]/dataWidth;
	            if (temp>result) result=temp;

	        };

	        this.value += (result - this.value)*0.1;

	        this.domElement.style.width=this.value*this.avatar.graphWidth+"%";

	    }

	}





	function AvatarBackground( gl, avatar, gradientTextureURL) {

	    var my = this;

	    this.avatar = avatar;

	    this.gradientTextureURL = gradientTextureURL;

	    this.gradients = [];

	    //

	    this.gl = gl;

	    if (document.getElementById("gradient-shader-vs")) {

	        this.gradientProgram = N3D.compileProgram( this.gl, "gradient-shader-vs", "gradient-shader-fs" );

	    } else {

	        this.gradientProgram = N3D.compileProgram( this.gl, Avatar.BackgroundVertexShader, Avatar.BackgroundFragmentShader);

	    }

	    this.gradientTexture = N3D.createTextureFromURL(this.gl, this.gradientTextureURL, true,this.gl.NEAREST,this.gl.NEAREST,false);

	    this.init();

	};

	AvatarBackground.prototype.init = function(seededRandom){

	    this.gradients.push( {q:[0,1,0,Math.random()*Math.PI*2], speed:Math.random()*0.1+0.05, color: [0.5,0.5,0.5,1]} );
	    this.gradients.push( {q:[1,0,0,Math.random()*Math.PI*2], speed:Math.random()*0.1+0.05, color: [0.5,0.5,0.5,1]} );
	    this.gradients.push( {q:[1,1,0,Math.random()*Math.PI*2], speed:Math.random()*0.1+0.05, color: [0.5,0.5,0.5,1]} );

	}

	AvatarBackground.prototype.render = function( amount ){

	        for (var i = 0; i < this.gradients.length; i++) {

	            var obj = this.gradients[i];

	            var offset;

	            if ( amount ) {
	                offset = amount * obj.speed * 100 + obj.q[3];
	            } else {
	                offset = obj.q[3] += obj.speed/100;
	            }

	            N3D.mat4.identity(this.avatar.avatarMVMatrix);

	            N3D.mat4.translate(this.avatar.avatarMVMatrix, this.avatar.avatarMVMatrix, [0, 0, -1.7]);

	            N3D.mat4.rotate(this.avatar.avatarMVMatrix,this.avatar.avatarMVMatrix,offset,[obj.q[0],obj.q[1],obj.q[2]]);

	            N3D.mat4.translate(this.avatar.avatarMVMatrix, this.avatar.avatarMVMatrix, [0, 0, -1.7]);

	            N3D.mat4.scale(this.avatar.avatarMVMatrix, this.avatar.avatarMVMatrix, [4,4,4]);

	            N3D.mat4.multiply(this.avatar.avatarFMatrix,this.avatar.avatarPMatrix,this.avatar.avatarMVMatrix);

	            //

	            N3D.startProgram(this.gl, this.gradientProgram, this.gl.unit3DBuffer);

	                N3D.samplerPointer(this.gl, this.gradientProgram, "uTextureSampler", 1, this.gradientTexture);

	                N3D.matrixPointer(this.gl, this.gradientProgram, "ufMatrix", this.avatar.avatarFMatrix);

	                this.gl.blendFunc(this.gl.ONE,this.gl.ONE);

	                N3D.setUniformFloat(this.gl, this.gradientProgram.p_uColor, new Float32Array(obj.color));

	                this.gl.disable(this.gl.DEPTH_TEST);

	                this.gl.drawArrays(this.gl.TRIANGLES, 0, this.gl.unit3DBuffer.numberOfVertices);

	            N3D.endProgram(this.gl);

	        }

	}



	// inlined shaders


	Avatar.AvatarVertexShader = ""+
	"attribute vec3 aVertexPosition;"+
	"attribute vec3 aVertexCorner;"+
	"attribute vec2 aVertexUV;"+
	"attribute vec2 aVertexNormal;"+
	"attribute vec4 aVertexPowers1;"+
	"attribute vec4 aVertexPowers2;"+
	"uniform float uTime;"+
	"uniform mat4 ufMatrix;"+
	"uniform sampler2D uDataSampler;"+
	"uniform sampler2D uMovementSampler;"+
	"varying vec2 vTextureCoord;"+
	"varying vec3 vFinalPoint;"+
	"varying vec2 vNormal;"+
	"varying float vTime;"+
	"varying float vPower;"+
	"void main(void) {"+
	"float testTime = fract(uTime);"+
	"float fTime = sin(testTime*6.283185307179586476925286766559)*0.25+0.25;"+
	"vec4 cols = texture2D(uDataSampler,vec2(aVertexUV.x*1.4+testTime*2.0,fTime));"+
	"cols.rgb=sin(clamp(cols.rgb*2.1-0.8,0.0,1.0)*3.1415926535897932384626433832795);"+
	"float c = cols.x*aVertexPowers1.x + cols.y*aVertexPowers1.y + cols.z*aVertexPowers1.z;"+
	"fTime = cos(testTime*6.283185307179586476925286766559)*0.25+0.25;"+
	"cols = texture2D(uDataSampler,vec2(aVertexUV.x*2.00-testTime,fTime + 0.5));"+
	"cols.rgb=sin(clamp(cols.rgb*2.1-0.8,0.0,1.0)*3.1415926535897932384626433832795);"+
	"c += cols.x*aVertexPowers2.x + cols.y*aVertexPowers2.y + cols.z*aVertexPowers2.z;"+
	"vec3 b3 = aVertexPosition*(0.2+0.4+c*0.2)+aVertexCorner*(c*2.0);"+
	"float m = texture2D(uMovementSampler,vec2(b3.x,b3.y+0.5)).x;"+
	"m = (1.0-cos(m*3.141592653589793238462643383279*4.00))*m*0.5+1.0;"+
	"gl_Position = ufMatrix*vec4(b3*m, 1.0) ;"+
	"vFinalPoint = vec3(gl_Position.x,gl_Position.y,gl_Position.z);"+
	"vTextureCoord = aVertexUV;"+
	"vNormal = aVertexNormal;"+
	"vTime = uTime;"+
	"vPower = c;"+
	"}";

	Avatar.AvatarFragmentShader = ""+
	"precision mediump float;"+
	"varying vec2 vTextureCoord;"+
	"varying vec3 vFinalPoint;"+
	"varying vec2 vNormal;"+
	"varying float vTime;"+
	"varying float vPower;"+
	"uniform sampler2D uHighlightSampler;"+
	"uniform sampler2D uSheenSampler;"+
	"void main(void) {"+
	"vec4 oil = texture2D(uSheenSampler,vTextureCoord*vec2(17.0,1.0)+vec2(vTime*17.0+vPower*2.00,vTime*60.00+vTextureCoord.x));"+
	"oil.a *= sin(vTime*690.0+vTextureCoord.x*4.0)*0.3+0.3;"+
	"gl_FragColor = "+
	"vec4(1.0,0.19,0.0,1.0)*(1.0+(vNormal.x-vNormal.y)*0.5)*(1.0-oil.a) + "+
	"oil*oil.a + "+
	"texture2D(uHighlightSampler,vTextureCoord*vec2(14.0,1.0)+vec2(-vTime+vPower*2.00 ,-vTime));"+
	"gl_FragColor *= 1.0 + clamp(vFinalPoint.y-0.2,-0.5,0.5);"+
	"gl_FragColor.a = 1.0;"+
	"}";

	Avatar.BackgroundVertexShader = ""+
	"attribute vec3 aVertexPosition;"+
	"attribute vec2 aVertexUV;"+
	"uniform mat4 ufMatrix;"+
	"varying vec2 vTextureCoord;"+
	"void main(void) {"+
	"gl_Position = ufMatrix*vec4(aVertexPosition, 1.0) ;"+
	"vTextureCoord = aVertexUV;"+
	"}";

	Avatar.BackgroundFragmentShader = ""+
	"precision mediump float;"+
	"varying vec2 vTextureCoord;"+
	"uniform vec4 uColor;"+
	"uniform sampler2D uTextureSampler;"+
	"void main(void) {"+
	"gl_FragColor = texture2D(uTextureSampler,vTextureCoord)*uColor;"+
	"}";



	 // camera / microphone stuff

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	var AudioContext = window.AudioContext || window.webkitAudioContext;

    return Avatar;
});
