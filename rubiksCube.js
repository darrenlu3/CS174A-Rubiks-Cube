import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

class Cube extends Shape {
    constructor() {
        super("position", "normal",);
        // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        this.arrays.normal = Vector3.cast(
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    }
}

export class Assignment3 extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            'cube': new Cube(),

        };

        // *** Materials
        this.materials = {
            test: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            test2: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ff0000")}),
        }

        this.initial_camera_location = Mat4.look_at(vec3(0, 10, 20), vec3(0, 0, 0), vec3(0, 1, 0));

        this.box000 = [Mat4.identity(), color(0.1,0.1,0.1,1)];
        this.box001 = [Mat4.identity().times(Mat4.translation(2,0,0)), color(0,0,1,1)];
        this.box002 = [Mat4.identity().times(Mat4.translation(4,0,0)), color(0,0,2,1)];
        this.box010 = [Mat4.identity().times(Mat4.translation(0,0,2)), color(0,1,0,1)];
        this.box011 = [Mat4.identity().times(Mat4.translation(2,0,2)), color(0,1,1,1)];
        this.box012 = [Mat4.identity().times(Mat4.translation(4,0,2)), color(0,1,2,1)];
        this.box020 = [Mat4.identity().times(Mat4.translation(0,0,4)), color(0,2,0,1)];
        this.box021 = [Mat4.identity().times(Mat4.translation(2,0,4)), color(0,2,1,1)];
        this.box022 = [Mat4.identity().times(Mat4.translation(4,0,4)), color(0,2,2,1)];
        this.box100 = [Mat4.identity().times(Mat4.translation(0,2,0)), color(1,0,0,1)];
        this.box101 = [Mat4.identity().times(Mat4.translation(2,2,0)), color(1,0,1,1)];
        this.box102 = [Mat4.identity().times(Mat4.translation(4,2,0)), color(1,0,2,1)];
        this.box110 = [Mat4.identity().times(Mat4.translation(0,2,2)), color(1,1,0,1)];
        this.box111 = [Mat4.identity().times(Mat4.translation(2,2,2)), color(1,1,1,1)];
        this.box112 = [Mat4.identity().times(Mat4.translation(4,2,2)), color(1,1,2,1)];
        this.box120 = [Mat4.identity().times(Mat4.translation(0,2,4)), color(1,2,0,1)];
        this.box121 = [Mat4.identity().times(Mat4.translation(2,2,4)), color(1,2,1,1)];
        this.box122 = [Mat4.identity().times(Mat4.translation(4,2,4)), color(1,2,2,1)];
        this.box200 = [Mat4.identity().times(Mat4.translation(0,4,0)), color(2,0,0,1)];
        this.box201 = [Mat4.identity().times(Mat4.translation(2,4,0)), color(2,0,1,1)];
        this.box202 = [Mat4.identity().times(Mat4.translation(4,4,0)), color(2,0,2,1)];
        this.box210 = [Mat4.identity().times(Mat4.translation(0,4,2)), color(2,1,0,1)];
        this.box211 = [Mat4.identity().times(Mat4.translation(2,4,2)), color(2,1,1,1)];
        this.box212 = [Mat4.identity().times(Mat4.translation(4,4,2)), color(2,1,2,1)];
        this.box220 = [Mat4.identity().times(Mat4.translation(0,4,4)), color(2,2,0,1)];
        this.box221 = [Mat4.identity().times(Mat4.translation(2,4,4)), color(2,2,1,1)];
        this.box222 = [Mat4.identity().times(Mat4.translation(4,4,4)), color(2,2,2,1)];

        this.cubes = [
            [ [this.box000, this.box001, this.box002],
              [this.box010, this.box011, this.box012],
              [this.box020, this.box021, this.box022],
            ],
            [ [this.box100, this.box101, this.box102],
              [this.box110, this.box111, this.box112],
              [this.box120, this.box121, this.box122],
            ],
            [ [this.box200, this.box201, this.box202],
              [this.box210, this.box211, this.box212],
              [this.box220, this.box221, this.box222],
            ],
        ];


    }

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.rotate_bot = false;
        this.rotate_top = false;
        this.rotate_left = false;
        this.rotate_right = false;
        this.rotate_front = false;
        this.rotate_back = false;
        this.bound1 = 0;
        this.bound2 = 0;
        this.bound3 = 0;
        this.bound4 = 0;
        this.bound5 = 0;
        this.bound6 = 0;
        this.key_triggered_button("Bottom", ["5"], () => this.rotate_bot = 1);
        this.key_triggered_button("Top", ["6"], () => this.rotate_top = 1);
        this.key_triggered_button("Left", ["7"], () => this.rotate_left = 1);
        this.key_triggered_button("Right", ["8"], () => this.rotate_right = 1);
        this.key_triggered_button("Front", ["9"], () => this.rotate_front = 1);
        this.key_triggered_button("Back", ["0"], () => this.rotate_back = 1);

        this.new_line();
}

    reset_model_transform() {
        this.box000[0] = Mat4.identity();
        this.box001[0] = Mat4.identity().times(Mat4.translation(2,0,0));
        this.box002[0] = Mat4.identity().times(Mat4.translation(4,0,0));
        this.box010[0] = Mat4.identity().times(Mat4.translation(0,0,2));
        this.box011[0] = Mat4.identity().times(Mat4.translation(2,0,2));
        this.box012[0] = Mat4.identity().times(Mat4.translation(4,0,2));
        this.box020[0] = Mat4.identity().times(Mat4.translation(0,0,4));
        this.box021[0] = Mat4.identity().times(Mat4.translation(2,0,4));
        this.box022[0] = Mat4.identity().times(Mat4.translation(4,0,4));
        this.box100[0] = Mat4.identity().times(Mat4.translation(0,2,0));
        this.box101[0] = Mat4.identity().times(Mat4.translation(2,2,0));
        this.box102[0] = Mat4.identity().times(Mat4.translation(4,2,0));
        this.box110[0] = Mat4.identity().times(Mat4.translation(0,2,2));
        this.box111[0] = Mat4.identity().times(Mat4.translation(2,2,2));
        this.box112[0] = Mat4.identity().times(Mat4.translation(4,2,2));
        this.box120[0] = Mat4.identity().times(Mat4.translation(0,2,4));
        this.box121[0] = Mat4.identity().times(Mat4.translation(2,2,4));
        this.box122[0] = Mat4.identity().times(Mat4.translation(4,2,4));
        this.box200[0] = Mat4.identity().times(Mat4.translation(0,4,0));
        this.box201[0] = Mat4.identity().times(Mat4.translation(2,4,0));
        this.box202[0] = Mat4.identity().times(Mat4.translation(4,4,0));
        this.box210[0] = Mat4.identity().times(Mat4.translation(0,4,2));
        this.box211[0] = Mat4.identity().times(Mat4.translation(2,4,2));
        this.box212[0] = Mat4.identity().times(Mat4.translation(4,4,2));
        this.box220[0] = Mat4.identity().times(Mat4.translation(0,4,4));
        this.box221[0] = Mat4.identity().times(Mat4.translation(2,4,4));
        this.box222[0] = Mat4.identity().times(Mat4.translation(4,4,4));
    }

    draw_cube(context, program_state, model_transform, index){
        let base = model_transform;
        let t = program_state.animation_time / 1000;
        if (this.rotate_bot && this.bound2 == 0 && this.bound3 == 0 && this.bound4 == 0 && this.bound5 == 0 && this.bound6 == 0) {
            this.bound1 += 1;
            let model_transform = Mat4.rotation(Math.PI / 60, 0, 1, 0);
            this.cubes[0][0][0][0] = this.cubes[0][0][0][0].times(Mat4.translation(2, 0, 2)).times(model_transform).times(Mat4.translation(-2, 0, -2));
            this.cubes[0][0][1][0] = this.cubes[0][0][1][0].times(Mat4.translation(0, 0, 2)).times(model_transform).times(Mat4.translation(0, 0, -2));
            this.cubes[0][0][2][0] = this.cubes[0][0][2][0].times(Mat4.translation(-2, 0, 2)).times(model_transform).times(Mat4.translation(2, 0, -2));
            this.cubes[0][1][0][0] = this.cubes[0][1][0][0].times(Mat4.translation(2, 0, 0)).times(model_transform).times(Mat4.translation(-2, 0, 0));
            this.cubes[0][1][1][0] = this.cubes[0][1][1][0].times(model_transform);
            this.cubes[0][1][2][0] = this.cubes[0][1][2][0].times(Mat4.translation(-2, 0, 0)).times(model_transform).times(Mat4.translation(2, 0, 0));
            this.cubes[0][2][0][0] = this.cubes[0][2][0][0].times(Mat4.translation(2, 0, -2)).times(model_transform).times(Mat4.translation(-2, 0, 2));
            this.cubes[0][2][1][0] = this.cubes[0][2][1][0].times(Mat4.translation(0, 0, -2)).times(model_transform).times(Mat4.translation(0, 0, 2));
            this.cubes[0][2][2][0] = this.cubes[0][2][2][0].times(Mat4.translation(-2, 0, -2)).times(model_transform).times(Mat4.translation(2, 0, 2));
            if (this.bound1 == 30) {
                this.rotate_bot = false;
                this.bound1 = 0;
                let temp_corner = this.cubes[0][0][0][1];
                this.cubes[0][0][0][1] = this.cubes[0][0][2][1];
                this.cubes[0][0][2][1] = this.cubes[0][2][2][1];
                this.cubes[0][2][2][1] = this.cubes[0][2][0][1];
                this.cubes[0][2][0][1] = temp_corner;
                let temp_edge = this.cubes[0][0][1][1];
                this.cubes[0][0][1][1] = this.cubes[0][1][2][1];
                this.cubes[0][1][2][1] = this.cubes[0][2][1][1];
                this.cubes[0][2][1][1] = this.cubes[0][1][0][1];
                this.cubes[0][1][0][1] = temp_edge;
                this.reset_model_transform();
            }
        }
        if (this.rotate_top && this.bound1 == 0 && this.bound3 == 0 && this.bound4 == 0 && this.bound5 == 0 && this.bound6 == 0) {
            this.bound2 += 1;
            let model_transform = Mat4.rotation(Math.PI/60,0,1,0);
            this.box200[0] =this.box200[0].times(Mat4.translation(2,0,2)).times(model_transform).times(Mat4.translation(-2,0,-2));
            this.box201[0] =this.box201[0].times(Mat4.translation(0,0,2)).times(model_transform).times(Mat4.translation(0,0,-2));
            this.box202[0] =this.box202[0].times(Mat4.translation(-2,0,2)).times(model_transform).times(Mat4.translation(2,0,-2));
            this.box210[0] =this.box210[0].times(Mat4.translation(2,0,0)).times(model_transform).times(Mat4.translation(-2,0,0));
            this.box211[0] =this.box211[0].times(model_transform);
            this.box212[0] =this.box212[0].times(Mat4.translation(-2,0,0)).times(model_transform).times(Mat4.translation(2,0,0));
            this.box220[0] =this.box220[0].times(Mat4.translation(2,0,-2)).times(model_transform).times(Mat4.translation(-2,0,2));
            this.box221[0] =this.box221[0].times(Mat4.translation(0,0,-2)).times(model_transform).times(Mat4.translation(0,0,2));
            this.box222[0] =this.box222[0].times(Mat4.translation(-2,0,-2)).times(model_transform).times(Mat4.translation(2,0,2));
            if (this.bound2 == 30) {
                this.rotate_top = false;
                this.bound2 = 0;
                let temp_corner = this.cubes[2][0][0][1];
                this.cubes[2][0][0][1] = this.cubes[2][0][2][1];
                this.cubes[2][0][2][1] = this.cubes[2][2][2][1];
                this.cubes[2][2][2][1] = this.cubes[2][2][0][1];
                this.cubes[2][2][0][1] = temp_corner;
                let temp_edge = this.cubes[2][0][1][1];
                this.cubes[2][0][1][1] = this.cubes[2][1][2][1];
                this.cubes[2][1][2][1] = this.cubes[2][2][1][1];
                this.cubes[2][2][1][1] = this.cubes[2][1][0][1];
                this.cubes[2][1][0][1] = temp_edge;
                this.reset_model_transform();
            }
        }
        if (this.rotate_left && this.bound2 == 0 && this.bound1 == 0 && this.bound4 == 0 && this.bound5 == 0 && this.bound6 == 0) {
            this.bound3 += 1;
            let model_transform = Mat4.rotation(Math.PI/60,1,0,0);
            this.box000[0] =this.box000[0].times(Mat4.translation(0,2,2)).times(model_transform).times(Mat4.translation(0,-2,-2));
            this.box010[0] =this.box010[0].times(Mat4.translation(0,2,0)).times(model_transform).times(Mat4.translation(0,-2,0));
            this.box020[0] =this.box020[0].times(Mat4.translation(0,2,-2)).times(model_transform).times(Mat4.translation(0,-2,2));
            this.box100[0] =this.box100[0].times(Mat4.translation(0,0,2)).times(model_transform).times(Mat4.translation(0,0,-2));
            this.box110[0] =this.box110[0].times(model_transform);
            this.box120[0] =this.box120[0].times(Mat4.translation(0,0,-2)).times(model_transform).times(Mat4.translation(0,0,2));
            this.box200[0] =this.box200[0].times(Mat4.translation(0,-2,2)).times(model_transform).times(Mat4.translation(0,2,-2));
            this.box210[0] =this.box210[0].times(Mat4.translation(0,-2,0)).times(model_transform).times(Mat4.translation(0,2,0));
            this.box220[0] =this.box220[0].times(Mat4.translation(0,-2,-2)).times(model_transform).times(Mat4.translation(0,2,2));
            if (this.bound3 == 30) {
                this.rotate_left = false;
                this.bound3 = 0;
                let temp_corner = this.cubes[2][0][0][1];
                this.cubes[2][0][0][1] = this.cubes[0][0][0][1];
                this.cubes[0][0][0][1] = this.cubes[0][2][0][1];
                this.cubes[0][2][0][1] = this.cubes[2][2][0][1];
                this.cubes[2][2][0][1] = temp_corner;
                let temp_edge = this.cubes[2][1][0][1];
                this.cubes[2][1][0][1] = this.cubes[1][0][0][1];
                this.cubes[1][0][0][1] = this.cubes[0][1][0][1];
                this.cubes[0][1][0][1] = this.cubes[1][2][0][1];
                this.cubes[1][2][0][1] = temp_edge;
                this.reset_model_transform();
            }
        }
        if (this.rotate_right && this.bound2 == 0 && this.bound3 == 0 && this.bound1 == 0 && this.bound5 == 0 && this.bound6 == 0) {
            this.bound4 += 1;
            let model_transform = Mat4.rotation(Math.PI/60,1,0,0);
            this.box002[0] =this.box002[0].times(Mat4.translation(0,2,2)).times(model_transform).times(Mat4.translation(0,-2,-2));
            this.box012[0] =this.box012[0].times(Mat4.translation(0,2,0)).times(model_transform).times(Mat4.translation(0,-2,0));
            this.box022[0] =this.box022[0].times(Mat4.translation(0,2,-2)).times(model_transform).times(Mat4.translation(0,-2,2));
            this.box102[0] =this.box102[0].times(Mat4.translation(0,0,2)).times(model_transform).times(Mat4.translation(0,0,-2));
            this.box112[0] =this.box112[0].times(model_transform);
            this.box122[0] =this.box122[0].times(Mat4.translation(0,0,-2)).times(model_transform).times(Mat4.translation(0,0,2));
            this.box202[0] =this.box202[0].times(Mat4.translation(0,-2,2)).times(model_transform).times(Mat4.translation(0,2,-2));
            this.box212[0] =this.box212[0].times(Mat4.translation(0,-2,0)).times(model_transform).times(Mat4.translation(0,2,0));
            this.box222[0] =this.box222[0].times(Mat4.translation(0,-2,-2)).times(model_transform).times(Mat4.translation(0,2,2));
            if (this.bound4 == 30) {
                this.rotate_right = false;
                this.bound4 = 0;
                let temp_corner = this.cubes[2][0][2][1];
                this.cubes[2][0][2][1] = this.cubes[0][0][2][1];
                this.cubes[0][0][2][1] = this.cubes[0][2][2][1];
                this.cubes[0][2][2][1] = this.cubes[2][2][2][1];
                this.cubes[2][2][2][1] = temp_corner;
                let temp_edge = this.cubes[2][1][2][1];
                this.cubes[2][1][2][1] = this.cubes[1][0][2][1];
                this.cubes[1][0][2][1] = this.cubes[0][1][2][1];
                this.cubes[0][1][2][1] = this.cubes[1][2][2][1];
                this.cubes[1][2][2][1] = temp_edge;
                this.reset_model_transform();
            }
        }
        if (this.rotate_front && this.bound2 == 0 && this.bound3 == 0 && this.bound4 == 0 && this.bound1 == 0 && this.bound6 == 0) {
            this.bound5 += 1;
            let model_transform = Mat4.rotation(Math.PI/60,0,0,1);
            this.box020[0] =this.box020[0].times(Mat4.translation(2,2,0)).times(model_transform).times(Mat4.translation(-2,-2,0));
            this.box021[0] =this.box021[0].times(Mat4.translation(0,2,0)).times(model_transform).times(Mat4.translation(0,-2,0));
            this.box022[0] =this.box022[0].times(Mat4.translation(-2,2,0)).times(model_transform).times(Mat4.translation(2,-2,0));
            this.box120[0] =this.box120[0].times(Mat4.translation(2,0,0)).times(model_transform).times(Mat4.translation(-2,0,0));
            this.box121[0] =this.box121[0].times(model_transform);
            this.box122[0] =this.box122[0].times(Mat4.translation(-2,0,0)).times(model_transform).times(Mat4.translation(2,0,0));
            this.box220[0] =this.box220[0].times(Mat4.translation(2,-2,0)).times(model_transform).times(Mat4.translation(-2,2,0));
            this.box221[0] =this.box221[0].times(Mat4.translation(0,-2,0)).times(model_transform).times(Mat4.translation(0,2,0));
            this.box222[0] =this.box222[0].times(Mat4.translation(-2,-2,0)).times(model_transform).times(Mat4.translation(2,2,0));
            if (this.bound5 == 30) {
                this.rotate_front = false;
                this.bound5 = 0;
                let temp_corner = this.cubes[2][2][0][1];
                this.cubes[2][2][0][1] = this.cubes[2][2][2][1];
                this.cubes[2][2][2][1] = this.cubes[0][2][2][1];
                this.cubes[0][2][2][1] = this.cubes[0][2][0][1];
                this.cubes[0][2][0][1] = temp_corner;
                let temp_edge = this.cubes[2][2][1][1];
                this.cubes[2][2][1][1] = this.cubes[1][2][2][1];
                this.cubes[1][2][2][1] = this.cubes[0][2][1][1];
                this.cubes[0][2][1][1] = this.cubes[1][2][0][1];
                this.cubes[1][2][0][1] = temp_edge;
                this.reset_model_transform();
            }
        }
        if (this.rotate_back && this.bound2 == 0 && this.bound3 == 0 && this.bound4 == 0 && this.bound5 == 0 && this.bound1 == 0) {
            this.bound6 += 1;
            let model_transform = Mat4.rotation(Math.PI/60,0,0,1);
            this.box000[0] =this.box000[0].times(Mat4.translation(2,2,0)).times(model_transform).times(Mat4.translation(-2,-2,0));
            this.box001[0] =this.box001[0].times(Mat4.translation(0,2,0)).times(model_transform).times(Mat4.translation(0,-2,0));
            this.box002[0] =this.box002[0].times(Mat4.translation(-2,2,0)).times(model_transform).times(Mat4.translation(2,-2,0));
            this.box100[0] =this.box100[0].times(Mat4.translation(2,0,0)).times(model_transform).times(Mat4.translation(-2,0,0));
            this.box101[0] =this.box101[0].times(model_transform);
            this.box102[0] =this.box102[0].times(Mat4.translation(-2,0,0)).times(model_transform).times(Mat4.translation(2,0,0));
            this.box200[0] =this.box200[0].times(Mat4.translation(2,-2,0)).times(model_transform).times(Mat4.translation(-2,2,0));
            this.box201[0] =this.box201[0].times(Mat4.translation(0,-2,0)).times(model_transform).times(Mat4.translation(0,2,0));
            this.box202[0] =this.box202[0].times(Mat4.translation(-2,-2,0)).times(model_transform).times(Mat4.translation(2,2,0));
            if (this.bound6 == 30) {
                this.rotate_back = false;
                this.bound6 = 0;
                let temp_corner = this.cubes[2][0][0][1];
                this.cubes[2][0][0][1] = this.cubes[2][0][2][1];
                this.cubes[2][0][2][1] = this.cubes[0][0][2][1];
                this.cubes[0][0][2][1] = this.cubes[0][0][0][1];
                this.cubes[0][0][0][1] = temp_corner;
                let temp_edge = this.cubes[2][0][1][1];
                this.cubes[2][0][1][1] = this.cubes[1][0][2][1];
                this.cubes[1][0][2][1] = this.cubes[0][0][1][1];
                this.cubes[0][0][1][1] = this.cubes[1][0][0][1];
                this.cubes[1][0][0][1] = temp_edge;
                this.reset_model_transform();
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++){
                for (let k = 0; k < 3; k++){
                    this.shapes.cube.draw(context, program_state, this.cubes[i][j][k][0], this.materials.test.override(this.cubes[i][j][k][1]));
                }
            }
        }
//         this.shapes.cube.draw(context, program_state, this.box000[0], this.materials.test.override(this.box000[1]));
//         this.shapes.cube.draw(context, program_state, this.box001[0], this.materials.test.override(this.box001[1]));
//         this.shapes.cube.draw(context, program_state, this.box002[0], this.materials.test.override(this.box002[1]));
//         this.shapes.cube.draw(context, program_state, this.box010[0], this.materials.test.override(this.box010[1]));
//         this.shapes.cube.draw(context, program_state, this.box011[0], this.materials.test.override(this.box011[1]));
//         this.shapes.cube.draw(context, program_state, this.box012[0], this.materials.test.override(this.box012[1]));
//         this.shapes.cube.draw(context, program_state, this.box020[0], this.materials.test.override(this.box020[1]));
//         this.shapes.cube.draw(context, program_state, this.box021[0], this.materials.test.override(this.box021[1]));
//         this.shapes.cube.draw(context, program_state, this.box022[0], this.materials.test.override(this.box022[1]));
//         this.shapes.cube.draw(context, program_state, this.box100[0], this.materials.test.override(this.box100[1]));
//         this.shapes.cube.draw(context, program_state, this.box101[0], this.materials.test.override(this.box101[1]));
//         this.shapes.cube.draw(context, program_state, this.box102[0], this.materials.test.override(this.box102[1]));
//         this.shapes.cube.draw(context, program_state, this.box110[0], this.materials.test.override(this.box110[1]));
//         this.shapes.cube.draw(context, program_state, this.box111[0], this.materials.test.override(this.box111[1]));
//         this.shapes.cube.draw(context, program_state, this.box112[0], this.materials.test.override(this.box112[1]));
//         this.shapes.cube.draw(context, program_state, this.box120[0], this.materials.test.override(this.box120[1]));
//         this.shapes.cube.draw(context, program_state, this.box121[0], this.materials.test.override(this.box121[1]));
//         this.shapes.cube.draw(context, program_state, this.box122[0], this.materials.test.override(this.box122[1]));
//         this.shapes.cube.draw(context, program_state, this.box200[0], this.materials.test.override(this.box200[1]));
//         this.shapes.cube.draw(context, program_state, this.box201[0], this.materials.test.override(this.box201[1]));
//         this.shapes.cube.draw(context, program_state, this.box202[0], this.materials.test.override(this.box202[1]));
//         this.shapes.cube.draw(context, program_state, this.box210[0], this.materials.test.override(this.box210[1]));
//         this.shapes.cube.draw(context, program_state, this.box211[0], this.materials.test.override(this.box211[1]));
//         this.shapes.cube.draw(context, program_state, this.box212[0], this.materials.test.override(this.box212[1]));
//         this.shapes.cube.draw(context, program_state, this.box220[0], this.materials.test.override(this.box220[1]));
//         this.shapes.cube.draw(context, program_state, this.box221[0], this.materials.test.override(this.box221[1]));
//         this.shapes.cube.draw(context, program_state, this.box222[0], this.materials.test.override(this.box222[1]));
//         for (let i = 0; i < 3; i++){
//             let column = base.times(Mat4.translation(0,i*2,0));
//             for (let j = 0; j < 3; j++){
//                 let row = column.times(Mat4.translation(j*2,0,0));
//                 for (let k = 0; k < 3; k++){
//                     let box_color = color(i,j,k,1.0);
//                     this.shapes.cube.draw(context,program_state,row,this.materials.test.override(box_color));
//                     row = row.times(Mat4.translation(0,0,2));
//                 }
                
//             }
//         }
        //this.shapes.cube.draw(context, program_state, model_transform, this.materials.test);

    }

    paint_cube(context, program_state, model_transform, index) {
        let base = model_transform;
        base = base.times(Mat4.translation(0,-1.1,0)).times(Mat4.scale(1,0,1));
        this.shapes.cube.draw(context, program_state, base, this.materials.test2);
    }

    display(context, program_state) {
        // display():  Called once per frame of animation.
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.initial_camera_location);
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);
        

        

        // TODO: Lighting (Requirement 2)
        const light_position = vec4(0, 5, 5, 1);
        // The parameters of the Light are: position, color, size
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];

        // TODO:  Fill in matrix operations and drawing code to draw the solar system scene (Requirements 3 and 4)
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        const yellow = hex_color("#fac91a");
        let model_transform = Mat4.identity().times(Mat4.translation(-1,-1,-1));
        
        this.draw_cube(context, program_state, model_transform, 0);
        //this.paint_cube(context,program_state,model_transform,0);
    }
}

class Gouraud_Shader extends Shader {
    // This is a Shader using Phong_Shader as template
    // TODO: Modify the glsl coder here to create a Gouraud Shader (Planet 2)

    constructor(num_lights = 2) {
        super();
        this.num_lights = num_lights;
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return ` 
        precision mediump float;
        const int N_LIGHTS = ` + this.num_lights + `;
        uniform float ambient, diffusivity, specularity, smoothness;
        uniform vec4 light_positions_or_vectors[N_LIGHTS], light_colors[N_LIGHTS];
        uniform float light_attenuation_factors[N_LIGHTS];
        uniform vec4 shape_color;
        uniform vec3 squared_scale, camera_center;
        varying vec4 fragcol;
        varying vec3 fragcollxyz;

        // Specifier "varying" means a variable's final value will be passed from the vertex shader
        // on to the next phase (fragment shader), then interpolated per-fragment, weighted by the
        // pixel fragment's proximity to each of the 3 vertices (barycentric interpolation).
        varying vec3 N, vertex_worldspace;
        // ***** PHONG SHADING HAPPENS HERE: *****                                       
        vec3 phong_model_lights( vec3 N, vec3 vertex_worldspace ){                                        
            // phong_model_lights():  Add up the lights' contributions.
            vec3 E = normalize( camera_center - vertex_worldspace );
            vec3 result = vec3( 0.0 );
            for(int i = 0; i < N_LIGHTS; i++){
                // Lights store homogeneous coords - either a position or vector.  If w is 0, the 
                // light will appear directional (uniform direction from all points), and we 
                // simply obtain a vector towards the light by directly using the stored value.
                // Otherwise if w is 1 it will appear as a point light -- compute the vector to 
                // the point light's location from the current surface point.  In either case, 
                // fade (attenuate) the light as the vector needed to reach it gets longer.  
                vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz - 
                                               light_positions_or_vectors[i].w * vertex_worldspace;                                             
                float distance_to_light = length( surface_to_light_vector );

                vec3 L = normalize( surface_to_light_vector );
                vec3 H = normalize( L + E );
                // Compute the diffuse and specular components from the Phong
                // Reflection Model, using Blinn's "halfway vector" method:
                float diffuse  =      max( dot( N, L ), 0.0 );
                float specular = pow( max( dot( N, H ), 0.0 ), smoothness );
                float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light );
                
                vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                                          + light_colors[i].xyz * specularity * specular;
                result += attenuation * light_contribution;
            }
            return result;
        } `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        return this.shared_glsl_code() + `
            attribute vec3 position, normal;                            
            // Position is expressed in object coordinates.
            
            uniform mat4 model_transform;
            uniform mat4 projection_camera_model_transform;
    
            void main(){                                                                   
                // The vertex's final resting place (in NDCS):
                gl_Position = projection_camera_model_transform * vec4( position, 1.0 );
                // The final normal vector in screen space.
                N = normalize( mat3( model_transform ) * normal / squared_scale);
                vertex_worldspace = ( model_transform * vec4( position, 1.0 ) ).xyz;
                
                fragcol = vec4( shape_color.xyz * ambient, shape_color.w );
                fragcollxyz = phong_model_lights( normalize( N ), vertex_worldspace );
            } `;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // A fragment is a pixel that's overlapped by the current triangle.
        // Fragments affect the final image or get discarded due to depth.
        return this.shared_glsl_code() + `
            void main(){                                                           
                // Compute an initial (ambient) color:
                gl_FragColor = fragcol;
                // Compute the final color with contributions from lights:
                gl_FragColor.xyz += fragcollxyz;
            } `;
    }

    send_material(gl, gpu, material) {
        // send_material(): Send the desired shape-wide material qualities to the
        // graphics card, where they will tweak the Phong lighting formula.
        gl.uniform4fv(gpu.shape_color, material.color);
        gl.uniform1f(gpu.ambient, material.ambient);
        gl.uniform1f(gpu.diffusivity, material.diffusivity);
        gl.uniform1f(gpu.specularity, material.specularity);
        gl.uniform1f(gpu.smoothness, material.smoothness);
    }

    send_gpu_state(gl, gpu, gpu_state, model_transform) {
        // send_gpu_state():  Send the state of our whole drawing context to the GPU.
        const O = vec4(0, 0, 0, 1), camera_center = gpu_state.camera_transform.times(O).to3();
        gl.uniform3fv(gpu.camera_center, camera_center);
        // Use the squared scale trick from "Eric's blog" instead of inverse transpose matrix:
        const squared_scale = model_transform.reduce(
            (acc, r) => {
                return acc.plus(vec4(...r).times_pairwise(r))
            }, vec4(0, 0, 0, 0)).to3();
        gl.uniform3fv(gpu.squared_scale, squared_scale);
        // Send the current matrices to the shader.  Go ahead and pre-compute
        // the products we'll need of the of the three special matrices and just
        // cache and send those.  They will be the same throughout this draw
        // call, and thus across each instance of the vertex shader.
        // Transpose them since the GPU expects matrices as column-major arrays.
        const PCM = gpu_state.projection_transform.times(gpu_state.camera_inverse).times(model_transform);
        gl.uniformMatrix4fv(gpu.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        gl.uniformMatrix4fv(gpu.projection_camera_model_transform, false, Matrix.flatten_2D_to_1D(PCM.transposed()));

        // Omitting lights will show only the material color, scaled by the ambient term:
        if (!gpu_state.lights.length)
            return;

        const light_positions_flattened = [], light_colors_flattened = [];
        for (let i = 0; i < 4 * gpu_state.lights.length; i++) {
            light_positions_flattened.push(gpu_state.lights[Math.floor(i / 4)].position[i % 4]);
            light_colors_flattened.push(gpu_state.lights[Math.floor(i / 4)].color[i % 4]);
        }
        gl.uniform4fv(gpu.light_positions_or_vectors, light_positions_flattened);
        gl.uniform4fv(gpu.light_colors, light_colors_flattened);
        gl.uniform1fv(gpu.light_attenuation_factors, gpu_state.lights.map(l => l.attenuation));
    }

    update_GPU(context, gpu_addresses, gpu_state, model_transform, material) {
        // update_GPU(): Define how to synchronize our JavaScript's variables to the GPU's.  This is where the shader
        // recieves ALL of its inputs.  Every value the GPU wants is divided into two categories:  Values that belong
        // to individual objects being drawn (which we call "Material") and values belonging to the whole scene or
        // program (which we call the "Program_State").  Send both a material and a program state to the shaders
        // within this function, one data field at a time, to fully initialize the shader for a draw.

        // Fill in any missing fields in the Material object with custom defaults for this shader:
        const defaults = {color: color(0, 0, 0, 1), ambient: 0, diffusivity: 1, specularity: 1, smoothness: 40};
        material = Object.assign({}, defaults, material);

        this.send_material(context, gpu_addresses, material);
        this.send_gpu_state(context, gpu_addresses, gpu_state, model_transform);
    }
}

class Ring_Shader extends Shader {
    update_GPU(context, gpu_addresses, graphics_state, model_transform, material) {
        // update_GPU():  Defining how to synchronize our JavaScript's variables to the GPU's:
        const [P, C, M] = [graphics_state.projection_transform, graphics_state.camera_inverse, model_transform],
            PCM = P.times(C).times(M);
        context.uniformMatrix4fv(gpu_addresses.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        context.uniformMatrix4fv(gpu_addresses.projection_camera_model_transform, false,
            Matrix.flatten_2D_to_1D(PCM.transposed()));
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return `
        precision mediump float;
        varying vec4 point_position;
        varying vec4 center;
        `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        attribute vec3 position;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_model_transform;
        void main(){
          gl_Position = projection_camera_model_transform * vec4(position, 1.0);
          point_position = vec4(position, 1);
          center = vec4(0,0,0,1);
        }`;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        void main(){
              if (distance(point_position, center) <= 3.2){
                 if (sin(100.0*distance(point_position, center)) < 0.0)
                     gl_FragColor = vec4(0.0,0.0,0.0,1.0);
                 else
                     gl_FragColor = vec4(0.5, 0.25, 0.1, 1.0);   
              }
        }`;
    }
}

