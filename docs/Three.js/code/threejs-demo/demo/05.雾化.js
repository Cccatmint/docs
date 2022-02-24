function init() {

    const controls = new function () {
        this.rotationSpeed = 0.02
        this.moveSpeed = 0.5
        this.fogColor = 0xffffff
        this.fogNear = 0.015
        this.fogFar = 100
        this.addCube = function () {
            const num = Math.random()
            const cubeGeometry = new THREE.BoxGeometry(4 * num, 4 * num, 4 * num)
            const cubeMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xFFFFFF
            })
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.name = `cube-${scene.children.length}`
            console.log(cube.name);
            cube.castShadow = true
            cube.position.set(50 - 100 * Math.random(), 5, 50 - 100 * Math.random())
            scene.add(cube)
            console.log(scene.children)
        }
    }
    const gui = new dat.GUI()
    gui.add(controls, 'rotationSpeed', -0.5, 0.5) // 设置数值范围-0.5 ~ 0.5
    gui.add(controls, 'moveSpeed', 0, 10) // 设置数值范围-10 ~ 10
    gui.add(controls, 'addCube') // 设置数值范围-10 ~ 10
    gui.add(controls, 'fogColor', 0 , 16777215)
    gui.add(controls, 'fogNear', 0 , 100)
    gui.add(controls, 'fogFar', 0 , 1000)
    // show fps
    const stats = initStats()

    // create scene
    scene = new THREE.Scene()
    // camera option
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000) // 创建透视相机
    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    // renderer option
    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(new THREE.Color(0x000000)) // 背景色
    renderer.setSize(window.innerWidth, window.innerHeight) // 渲染区域大小
    renderer.shadowMap.enabled = true

    // spotLight (点光源)
    const spotLight = new THREE.SpotLight(0xFFFFFF)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true // 启用该光源的阴影功能
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    spotLight.shadow.camera.far = 130
    spotLight.shadow.camera.near = 40
    spotLight.shadow.camera.fov = 30
    scene.add(spotLight)

    // create axes
    const axes = new THREE.AxesHelper(50)
    scene.add(axes)

    // create plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100) // 几何
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xAAAAAA
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)

    // plane option
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(0, 0, 0)
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

    const trackballControls = initTrackballControls(camera, renderer)
    const clock = new THREE.Clock()

    function renderScene() {
        stats.update()
        trackballControls.update(clock.getDelta())

        cube.rotation.x += controls.rotationSpeed
        cube.rotation.y += controls.rotationSpeed
        cube.rotation.z += controls.rotationSpeed

        if (cube.position.x < 15) {
            cube.position.x += controls.moveSpeed
        } else {
            cube.position.x = -4
        }

        // new cube animation
        scene.children.forEach(item => {
            if (/^cube-/g.test(item.name)) {
                item.rotation.x += controls.rotationSpeed
                item.rotation.y += controls.rotationSpeed
                item.rotation.z += controls.rotationSpeed
            }
        })

        // change fog
        scene.fog = new THREE.Fog(controls.fogColor, controls.fogNear, controls.fogFar)

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    renderScene()


}

