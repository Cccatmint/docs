function init () {
    const stats = initStats()
    const scene = new THREE.Scene()
    // camera option
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000) // 创建透视相机
    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    // renderer option
    const renderer = new THREE.WebGLRenderer()
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

    // // render the scene
    // renderer.render(scene, camera)
    // !
    function renderScene() {
        stats.update()

        // animation
        cube.rotation.x += 0.02
        cube.rotation.y += 0.02
        cube.rotation.z -= 0.02
        
        if(cube.position.x < 15) {
            cube.position.x += 0.1
        } else {
            cube.position.x = -4
        }

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    renderScene()

    
}

