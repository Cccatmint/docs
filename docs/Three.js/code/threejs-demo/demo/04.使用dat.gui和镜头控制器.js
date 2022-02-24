function init () {
    // ! use dat.gui control speed variable
    const controls = new function () {
        this.rotationSpeed = 0.02
        this.moveSpeed = 0.5
    }
    const gui = new dat.GUI()
    gui.add(controls, 'rotationSpeed', -0.5, 0.5) // 设置数值范围-0.5 ~ 0.5
    gui.add(controls, 'moveSpeed', 0, 10) // 设置数值范围-10 ~ 10

    // show fps
    const stats = initStats()

    // create scene
    scene = new THREE.Scene() // !
    // camera option
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000) // 创建透视相机
    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    // renderer option
    renderer = new THREE.WebGLRenderer() // !
    renderer.setClearColor(new THREE.Color(0x000000)) // 背景色
    renderer.setSize(window.innerWidth, window.innerHeight) // 渲染区域大小
    renderer.shadowMap.enabled = true

    // spotLight (点光源)
    const spotLight = new THREE.SpotLight(0xFFFFFF)
    spotLight.position.set(-40,60,-10)
    spotLight.castShadow = true // 启用该光源的阴影功能
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    spotLight.shadow.camera.far = 130
    spotLight.shadow.camera.near = 40
    spotLight.shadow.camera.fov = 30
    scene.add(spotLight)

    // create axes
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)

    // create plane
    const planeGeometry = new THREE.PlaneGeometry(60, 20) // 几何
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xAAAAAA
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    
    // plane option
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(15, 0, 0)
    plane.receiveShadow = true
    scene.add(plane)

    // create a cube
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0x62B4D3
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.position.set(-4, 3, 0)
    scene.add(cube)

    // output to the html element
    document.getElementById('webgl_output').appendChild(renderer.domElement)

    // ! 鼠标控制镜头JS库初始化(需要响应DOM所以必须在DOM挂载之后) initTrackballControls 在uitils.js中
    const trackballControls = initTrackballControls(camera, renderer)
    const clock = new THREE.Clock()

    function renderScene() {
        stats.update()
        // ! 鼠标控制镜头
        trackballControls.update(clock.getDelta())

        // ! animation
        cube.rotation.x += controls.rotationSpeed
        cube.rotation.y += controls.rotationSpeed
        cube.rotation.z += controls.rotationSpeed
        
        if(cube.position.x < 15) {
            cube.position.x += controls.moveSpeed
        } else {
            cube.position.x = -4
        }

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    renderScene()

    
}

