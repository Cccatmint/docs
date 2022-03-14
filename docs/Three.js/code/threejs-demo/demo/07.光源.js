/**
 * 没有光源，渲染的场景将不可见
 * 基础光源：
 * THREE.AmbientLight：
 * 在创建THREE.AmbientLight时，颜色将会应用到全局。该光源并没有特别的来源方向，并且THREE.AmbientLight不会生成阴影
 */

function init () {
    const controls = new function () {
        this.ambientLightIntensity = 1
        this.ambientLightColor = 0xFFFFFF
    }
    const gui = new dat.GUI()
    gui.add(controls, 'ambientLightIntensity', 0, 1)
    gui.add(controls, 'ambientLightColor', 0x000000, 0xFFFFFF)
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

    // ! 基础光源
    const ambientLight  = new THREE.AmbientLight("#606008")
    scene.add(ambientLight)

    // create axes
    const axes = new THREE.AxesHelper(50)
    scene.add(axes)

    // create plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100) // 几何
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF
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

        // ! gui change ambientLight 注意颜色的修改需要用THREE.Color()构造的对象
        ambientLight.intensity = controls.ambientLightIntensity
        ambientLight.color = new THREE.Color(controls.ambientLightColor)

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    renderScene()
}