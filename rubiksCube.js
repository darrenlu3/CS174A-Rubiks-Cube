import { defs, tiny } from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

const { Funny_Shader } = defs;

class Cube extends Shape {
    constructor() {
        super("position", "normal");
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

export class PuzzleCube extends Scene {
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
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
            test2: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ff0000") }),
        }

        this.initial_camera_location = Mat4.look_at(vec3(15, 10, 15), vec3(0, 0, 0), vec3(0, 1, 0));

        this.box000 = [Mat4.identity(), color(0.1, 0.1, 0.1, 1)];
        this.box001 = [Mat4.identity().times(Mat4.translation(2, 0, 0)), color(0, 0, 1, 1)];
        this.box002 = [Mat4.identity().times(Mat4.translation(4, 0, 0)), color(0, 0, 2, 1)];
        this.box010 = [Mat4.identity().times(Mat4.translation(0, 0, 2)), color(0, 1, 0, 1)];
        this.box011 = [Mat4.identity().times(Mat4.translation(2, 0, 2)), color(0, 1, 1, 1)];
        this.box012 = [Mat4.identity().times(Mat4.translation(4, 0, 2)), color(0, 1, 2, 1)];
        this.box020 = [Mat4.identity().times(Mat4.translation(0, 0, 4)), color(0, 2, 0, 1)];
        this.box021 = [Mat4.identity().times(Mat4.translation(2, 0, 4)), color(0, 2, 1, 1)];
        this.box022 = [Mat4.identity().times(Mat4.translation(4, 0, 4)), color(0, 2, 2, 1)];
        this.box100 = [Mat4.identity().times(Mat4.translation(0, 2, 0)), color(1, 0, 0, 1)];
        this.box101 = [Mat4.identity().times(Mat4.translation(2, 2, 0)), color(1, 0, 1, 1)];
        this.box102 = [Mat4.identity().times(Mat4.translation(4, 2, 0)), color(1, 0, 2, 1)];
        this.box110 = [Mat4.identity().times(Mat4.translation(0, 2, 2)), color(1, 1, 0, 1)];
        this.box111 = [Mat4.identity().times(Mat4.translation(2, 2, 2)), color(1, 1, 1, 1)];
        this.box112 = [Mat4.identity().times(Mat4.translation(4, 2, 2)), color(1, 1, 2, 1)];
        this.box120 = [Mat4.identity().times(Mat4.translation(0, 2, 4)), color(1, 2, 0, 1)];
        this.box121 = [Mat4.identity().times(Mat4.translation(2, 2, 4)), color(1, 2, 1, 1)];
        this.box122 = [Mat4.identity().times(Mat4.translation(4, 2, 4)), color(1, 2, 2, 1)];
        this.box200 = [Mat4.identity().times(Mat4.translation(0, 4, 0)), color(2, 0, 0, 1)];
        this.box201 = [Mat4.identity().times(Mat4.translation(2, 4, 0)), color(2, 0, 1, 1)];
        this.box202 = [Mat4.identity().times(Mat4.translation(4, 4, 0)), color(2, 0, 2, 1)];
        this.box210 = [Mat4.identity().times(Mat4.translation(0, 4, 2)), color(2, 1, 0, 1)];
        this.box211 = [Mat4.identity().times(Mat4.translation(2, 4, 2)), color(2, 1, 1, 1)];
        this.box212 = [Mat4.identity().times(Mat4.translation(4, 4, 2)), color(2, 1, 2, 1)];
        this.box220 = [Mat4.identity().times(Mat4.translation(0, 4, 4)), color(2, 2, 0, 1)];
        this.box221 = [Mat4.identity().times(Mat4.translation(2, 4, 4)), color(2, 2, 1, 1)];
        this.box222 = [Mat4.identity().times(Mat4.translation(4, 4, 4)), color(2, 2, 2, 1)];

        this.cubes = [
            [[this.box000, this.box001, this.box002],
            [this.box010, this.box011, this.box012],
            [this.box020, this.box021, this.box022],
            ],
            [[this.box100, this.box101, this.box102],
            [this.box110, this.box111, this.box112],
            [this.box120, this.box121, this.box122],
            ],
            [[this.box200, this.box201, this.box202],
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
        this.shuffle_flag = false;
        this.shuffle_count = 0;
        this.moved = false;
        this.bound1 = 0;
        this.bound2 = 0;
        this.bound3 = 0;
        this.bound4 = 0;
        this.bound5 = 0;
        this.bound6 = 0;
        this.key_triggered_button("Bottom", ["5"], () => this.rotate_bot = 1);
        this.new_line();
        this.key_triggered_button("Top", ["6"], () => this.rotate_top = 1);
        this.new_line();
        this.key_triggered_button("Left", ["7"], () => this.rotate_left = 1);
        this.new_line();
        this.key_triggered_button("Right", ["8"], () => this.rotate_right = 1);
        this.new_line();
        this.key_triggered_button("Front", ["9"], () => this.rotate_front = 1);
        this.new_line();
        this.key_triggered_button("Back", ["0"], () => this.rotate_back = 1);
        this.new_line();
        this.key_triggered_button("Shuffle", ["-"], () => this.shuffle_flag = 1);
        this.new_line();
    }

    reset_model_transform() {
        this.box000[0] = Mat4.identity();
        this.box001[0] = Mat4.identity().times(Mat4.translation(2, 0, 0));
        this.box002[0] = Mat4.identity().times(Mat4.translation(4, 0, 0));
        this.box010[0] = Mat4.identity().times(Mat4.translation(0, 0, 2));
        this.box011[0] = Mat4.identity().times(Mat4.translation(2, 0, 2));
        this.box012[0] = Mat4.identity().times(Mat4.translation(4, 0, 2));
        this.box020[0] = Mat4.identity().times(Mat4.translation(0, 0, 4));
        this.box021[0] = Mat4.identity().times(Mat4.translation(2, 0, 4));
        this.box022[0] = Mat4.identity().times(Mat4.translation(4, 0, 4));
        this.box100[0] = Mat4.identity().times(Mat4.translation(0, 2, 0));
        this.box101[0] = Mat4.identity().times(Mat4.translation(2, 2, 0));
        this.box102[0] = Mat4.identity().times(Mat4.translation(4, 2, 0));
        this.box110[0] = Mat4.identity().times(Mat4.translation(0, 2, 2));
        this.box111[0] = Mat4.identity().times(Mat4.translation(2, 2, 2));
        this.box112[0] = Mat4.identity().times(Mat4.translation(4, 2, 2));
        this.box120[0] = Mat4.identity().times(Mat4.translation(0, 2, 4));
        this.box121[0] = Mat4.identity().times(Mat4.translation(2, 2, 4));
        this.box122[0] = Mat4.identity().times(Mat4.translation(4, 2, 4));
        this.box200[0] = Mat4.identity().times(Mat4.translation(0, 4, 0));
        this.box201[0] = Mat4.identity().times(Mat4.translation(2, 4, 0));
        this.box202[0] = Mat4.identity().times(Mat4.translation(4, 4, 0));
        this.box210[0] = Mat4.identity().times(Mat4.translation(0, 4, 2));
        this.box211[0] = Mat4.identity().times(Mat4.translation(2, 4, 2));
        this.box212[0] = Mat4.identity().times(Mat4.translation(4, 4, 2));
        this.box220[0] = Mat4.identity().times(Mat4.translation(0, 4, 4));
        this.box221[0] = Mat4.identity().times(Mat4.translation(2, 4, 4));
        this.box222[0] = Mat4.identity().times(Mat4.translation(4, 4, 4));
        this.moved = true;
    }


    check_solved(){
        console.log(JSON.stringify(this.box001[1].map(Number)), JSON.stringify(color(0, 0, 1, 1).map(Number)), JSON.stringify(this.box001[1].map(Number)) == JSON.stringify(color(0, 0, 1, 1).map(Number)))
        ;
        if (JSON.stringify(this.box000[1].map(Number)) == JSON.stringify(color(0.1, 0.1, 0.1, 1).map(Number)) &&
        (JSON.stringify(this.box001[1].map(Number)) == JSON.stringify(color(0, 0, 1, 1).map(Number))) &&
        (JSON.stringify(this.box002[1].map(Number)) == JSON.stringify(color(0, 0, 2, 1).map(Number))) &&
        (JSON.stringify(this.box010[1].map(Number)) == JSON.stringify(color(0, 1, 0, 1).map(Number))) &&
        (JSON.stringify(this.box011[1].map(Number)) == JSON.stringify(color(0, 1, 1, 1).map(Number))) &&
        (JSON.stringify(this.box012[1].map(Number)) == JSON.stringify(color(0, 1, 2, 1).map(Number))) &&
        (JSON.stringify(this.box020[1].map(Number)) == JSON.stringify(color(0, 2, 0, 1).map(Number))) &&
        (JSON.stringify(this.box021[1].map(Number)) == JSON.stringify(color(0, 2, 1, 1).map(Number))) &&
        (JSON.stringify(this.box022[1].map(Number)) == JSON.stringify(color(0, 2, 2, 1).map(Number))) &&
        (JSON.stringify(this.box100[1].map(Number)) == JSON.stringify(color(1, 0, 0, 1).map(Number))) &&
        (JSON.stringify(this.box101[1].map(Number)) == JSON.stringify(color(1, 0, 1, 1).map(Number))) &&
        (JSON.stringify(this.box102[1].map(Number)) == JSON.stringify(color(1, 0, 2, 1).map(Number))) &&
        (JSON.stringify(this.box110[1].map(Number)) == JSON.stringify(color(1, 1, 0, 1).map(Number))) &&
        (JSON.stringify(this.box111[1].map(Number)) == JSON.stringify(color(1, 1, 1, 1).map(Number))) &&
        (JSON.stringify(this.box112[1].map(Number)) == JSON.stringify(color(1, 1, 2, 1).map(Number))) &&
        (JSON.stringify(this.box120[1].map(Number)) == JSON.stringify(color(1, 2, 0, 1).map(Number))) &&
        (JSON.stringify(this.box121[1].map(Number)) == JSON.stringify(color(1, 2, 1, 1).map(Number))) &&
        (JSON.stringify(this.box122[1].map(Number)) == JSON.stringify(color(1, 2, 2, 1).map(Number))) &&
        (JSON.stringify(this.box200[1].map(Number)) == JSON.stringify(color(2, 0, 0, 1).map(Number))) &&
        (JSON.stringify(this.box201[1].map(Number)) == JSON.stringify(color(2, 0, 1, 1).map(Number))) &&
        (JSON.stringify(this.box202[1].map(Number)) == JSON.stringify(color(2, 0, 2, 1).map(Number))) &&
        (JSON.stringify(this.box210[1].map(Number)) == JSON.stringify(color(2, 1, 0, 1).map(Number))) &&
        (JSON.stringify(this.box211[1].map(Number)) == JSON.stringify(color(2, 1, 1, 1).map(Number))) &&
        (JSON.stringify(this.box212[1].map(Number)) == JSON.stringify(color(2, 1, 2, 1).map(Number))) &&
        (JSON.stringify(this.box220[1].map(Number)) == JSON.stringify(color(2, 2, 0, 1).map(Number))) &&
        (JSON.stringify(this.box221[1].map(Number)) == JSON.stringify(color(2, 2, 1, 1).map(Number))) &&
        (JSON.stringify(this.box222[1].map(Number)) == JSON.stringify(color(2, 2, 2, 1).map(Number)))){
            return 1;
        }
        return 0;
    }

    draw_cube(context, program_state, model_transform, index) {
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
            let model_transform = Mat4.rotation(Math.PI / 60, 0, 1, 0);
            this.box200[0] = this.box200[0].times(Mat4.translation(2, 0, 2)).times(model_transform).times(Mat4.translation(-2, 0, -2));
            this.box201[0] = this.box201[0].times(Mat4.translation(0, 0, 2)).times(model_transform).times(Mat4.translation(0, 0, -2));
            this.box202[0] = this.box202[0].times(Mat4.translation(-2, 0, 2)).times(model_transform).times(Mat4.translation(2, 0, -2));
            this.box210[0] = this.box210[0].times(Mat4.translation(2, 0, 0)).times(model_transform).times(Mat4.translation(-2, 0, 0));
            this.box211[0] = this.box211[0].times(model_transform);
            this.box212[0] = this.box212[0].times(Mat4.translation(-2, 0, 0)).times(model_transform).times(Mat4.translation(2, 0, 0));
            this.box220[0] = this.box220[0].times(Mat4.translation(2, 0, -2)).times(model_transform).times(Mat4.translation(-2, 0, 2));
            this.box221[0] = this.box221[0].times(Mat4.translation(0, 0, -2)).times(model_transform).times(Mat4.translation(0, 0, 2));
            this.box222[0] = this.box222[0].times(Mat4.translation(-2, 0, -2)).times(model_transform).times(Mat4.translation(2, 0, 2));
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
            let model_transform = Mat4.rotation(Math.PI / 60, 1, 0, 0);
            this.box000[0] = this.box000[0].times(Mat4.translation(0, 2, 2)).times(model_transform).times(Mat4.translation(0, -2, -2));
            this.box010[0] = this.box010[0].times(Mat4.translation(0, 2, 0)).times(model_transform).times(Mat4.translation(0, -2, 0));
            this.box020[0] = this.box020[0].times(Mat4.translation(0, 2, -2)).times(model_transform).times(Mat4.translation(0, -2, 2));
            this.box100[0] = this.box100[0].times(Mat4.translation(0, 0, 2)).times(model_transform).times(Mat4.translation(0, 0, -2));
            this.box110[0] = this.box110[0].times(model_transform);
            this.box120[0] = this.box120[0].times(Mat4.translation(0, 0, -2)).times(model_transform).times(Mat4.translation(0, 0, 2));
            this.box200[0] = this.box200[0].times(Mat4.translation(0, -2, 2)).times(model_transform).times(Mat4.translation(0, 2, -2));
            this.box210[0] = this.box210[0].times(Mat4.translation(0, -2, 0)).times(model_transform).times(Mat4.translation(0, 2, 0));
            this.box220[0] = this.box220[0].times(Mat4.translation(0, -2, -2)).times(model_transform).times(Mat4.translation(0, 2, 2));
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
            let model_transform = Mat4.rotation(Math.PI / 60, 1, 0, 0);
            this.box002[0] = this.box002[0].times(Mat4.translation(0, 2, 2)).times(model_transform).times(Mat4.translation(0, -2, -2));
            this.box012[0] = this.box012[0].times(Mat4.translation(0, 2, 0)).times(model_transform).times(Mat4.translation(0, -2, 0));
            this.box022[0] = this.box022[0].times(Mat4.translation(0, 2, -2)).times(model_transform).times(Mat4.translation(0, -2, 2));
            this.box102[0] = this.box102[0].times(Mat4.translation(0, 0, 2)).times(model_transform).times(Mat4.translation(0, 0, -2));
            this.box112[0] = this.box112[0].times(model_transform);
            this.box122[0] = this.box122[0].times(Mat4.translation(0, 0, -2)).times(model_transform).times(Mat4.translation(0, 0, 2));
            this.box202[0] = this.box202[0].times(Mat4.translation(0, -2, 2)).times(model_transform).times(Mat4.translation(0, 2, -2));
            this.box212[0] = this.box212[0].times(Mat4.translation(0, -2, 0)).times(model_transform).times(Mat4.translation(0, 2, 0));
            this.box222[0] = this.box222[0].times(Mat4.translation(0, -2, -2)).times(model_transform).times(Mat4.translation(0, 2, 2));
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
            let model_transform = Mat4.rotation(Math.PI / 60, 0, 0, 1);
            this.box020[0] = this.box020[0].times(Mat4.translation(2, 2, 0)).times(model_transform).times(Mat4.translation(-2, -2, 0));
            this.box021[0] = this.box021[0].times(Mat4.translation(0, 2, 0)).times(model_transform).times(Mat4.translation(0, -2, 0));
            this.box022[0] = this.box022[0].times(Mat4.translation(-2, 2, 0)).times(model_transform).times(Mat4.translation(2, -2, 0));
            this.box120[0] = this.box120[0].times(Mat4.translation(2, 0, 0)).times(model_transform).times(Mat4.translation(-2, 0, 0));
            this.box121[0] = this.box121[0].times(model_transform);
            this.box122[0] = this.box122[0].times(Mat4.translation(-2, 0, 0)).times(model_transform).times(Mat4.translation(2, 0, 0));
            this.box220[0] = this.box220[0].times(Mat4.translation(2, -2, 0)).times(model_transform).times(Mat4.translation(-2, 2, 0));
            this.box221[0] = this.box221[0].times(Mat4.translation(0, -2, 0)).times(model_transform).times(Mat4.translation(0, 2, 0));
            this.box222[0] = this.box222[0].times(Mat4.translation(-2, -2, 0)).times(model_transform).times(Mat4.translation(2, 2, 0));
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
            let model_transform = Mat4.rotation(Math.PI / 60, 0, 0, 1);
            this.box000[0] = this.box000[0].times(Mat4.translation(2, 2, 0)).times(model_transform).times(Mat4.translation(-2, -2, 0));
            this.box001[0] = this.box001[0].times(Mat4.translation(0, 2, 0)).times(model_transform).times(Mat4.translation(0, -2, 0));
            this.box002[0] = this.box002[0].times(Mat4.translation(-2, 2, 0)).times(model_transform).times(Mat4.translation(2, -2, 0));
            this.box100[0] = this.box100[0].times(Mat4.translation(2, 0, 0)).times(model_transform).times(Mat4.translation(-2, 0, 0));
            this.box101[0] = this.box101[0].times(model_transform);
            this.box102[0] = this.box102[0].times(Mat4.translation(-2, 0, 0)).times(model_transform).times(Mat4.translation(2, 0, 0));
            this.box200[0] = this.box200[0].times(Mat4.translation(2, -2, 0)).times(model_transform).times(Mat4.translation(-2, 2, 0));
            this.box201[0] = this.box201[0].times(Mat4.translation(0, -2, 0)).times(model_transform).times(Mat4.translation(0, 2, 0));
            this.box202[0] = this.box202[0].times(Mat4.translation(-2, -2, 0)).times(model_transform).times(Mat4.translation(2, 2, 0));
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
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    this.shapes.cube.draw(context, program_state, this.cubes[i][j][k][0], this.materials.test.override(this.cubes[i][j][k][1]));
                }
            }
        }
        if (this.moved && this.check_solved() == 1){
            alert("Solved!")
            this.moved = false;
        };
    }
    
    shuffle() {
        let side = Math.floor(Math.random() * 6);
        if (side == 0) {
            this.rotate_bot = 1;
        }
        else if (side == 1) {
            this.rotate_top = 1;
        }
        else if (side == 2) {
            this.rotate_left = 1;
        }
        else if (side == 3) {
            this.rotate_right = 1;
        }
        else if (side == 4) {
            this.rotate_front = 1;
        }
        else {
            this.rotate_back = 1;
        }
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

        // Lighting
        const light_position1 = vec4(0, 10, 5, 1);
        const light_position2 = vec4(0, -10, 5, 1);

        program_state.lights = [new Light(light_position1, color(1, 1, 1, 1), 100), new Light(light_position2, color(1, 1, 1, 1), 100)];

        // Drawing
        let model_transform = Mat4.identity().times(Mat4.translation(-1, -1, -1));

        // Shuffle
        if (this.shuffle_flag == 1 && this.bound1 == 0 && this.bound2 == 0 && this.bound3 == 0 && this.bound4 == 0 && this.bound5 == 0 && this.bound6 == 0) {
            this.shuffle();
            this.shuffle_count = this.shuffle_count + 1;
            if (this.shuffle_count == 15) { // Change number to desired turns per shuffle
                this.shuffle_flag = 0;
                this.shuffle_count = 0;
            }
        }
        this.draw_cube(context, program_state, model_transform, 0);
    }
}

class Cube_Shader extends Shader {

}
