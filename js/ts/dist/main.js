"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let components = {
    conntent: document.querySelectorAll(`.contents`)[0],
    error: `
    <!-- error -->
    <div class="error">
      <h1 class="title_1">تعذر علينا إكمال طلبك</h1>
      <button class="t_2">يرجى محاولة إعادة تحميل الصفحة</button>
    </div>
    <!-- error -->
    `,
    set_location: `
    <!-- set location -->
    <div class="set_location">
      <div class="ctn">
        <h1 class="t_3">المرجو تحديد مكان تواجدك</h1>
        <!-- steps -->
        <div class="steps">
          <div class="step_n">
            <div class="circle t_n">1</div>
          </div>
          <div class="step_n">
            <div class="line"></div>            
            <div class="circle t_n">2</div>
          </div>
          <div class="step_n">
            <div class="line"></div>            
            <div class="circle t_n">3</div>
          </div>
        </div>
        <!-- steps -->
        <!-- options -->
        <div class="options">
          <div class="option_n">
            <select class="t_2" id="input_list_country" name="country">
              <option>select country</option>
            </select>
            <div class="load_op">
              <i class="fa-solid fa-repeat t_2"></i>
            </div>
          </div>
          <div class="option_n">
            <select class="t_2" id="input_list_side" name="side">
              <option>select side</option>
            </select>
            <div class="load_op">
              <i class="fa-solid fa-repeat t_2"></i>
            </div>
          </div>
          <div class="option_n">
            <select class="t_2" id="input_list_city" name="city">
            <option>select city</option>
            </select>
            <div class="load_op">
              <i class="fa-solid fa-repeat t_2"></i>
            </div>
          </div>
        </div>
        <!-- options -->
        <!-- button -->
        <button class="btn t_2">
          التالي
        </button>
        <!-- button -->        
      </div>
    </div>
    <!-- set location -->
    `,
};
function prayer_tiling() {
    // set_location
    function set_location() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // data_user
                let data_user = {
                    country: ``,
                    side: ``,
                    city: ``,
                };
                // display set_location;
                components.conntent.innerHTML = components.set_location;
                // inputs & loads
                let options = {
                    countrys: {
                        input: document.querySelectorAll(`.set_location .ctn .options > :nth-child(1) > :nth-child(1)`)[0],
                        load: document.querySelectorAll(`.set_location .ctn .options > :nth-child(1) > :nth-child(2) `)[0],
                    },
                    sides: {
                        input: document.querySelectorAll(`.set_location .ctn .options > :nth-child(2) > :nth-child(1)`)[0],
                        load: document.querySelectorAll(`.set_location .ctn .options > :nth-child(2) > :nth-child(2) `)[0],
                    },
                    citys: {
                        input: document.querySelectorAll(`.set_location .ctn .options > :nth-child(3) > :nth-child(1)`)[0],
                        load: document.querySelectorAll(`.set_location .ctn .options > :nth-child(3) > :nth-child(2) `)[0],
                    },
                };
                // steps 
                let steps = {
                    step_1: {
                        circle: document.querySelectorAll(`.set_location .ctn .steps > :nth-child(1) > :nth-child(1)`)[0],
                    },
                    step_2: {
                        line: document.querySelectorAll(`.set_location .ctn .steps :nth-child(2) > :nth-child(1)`)[0],
                        circle: document.querySelectorAll(`.set_location .ctn .steps :nth-child(2) > :nth-child(2)`)[0],
                    },
                    step_3: {
                        line: document.querySelectorAll(`.set_location .ctn .steps :nth-child(3) > :nth-child(1)`)[0],
                        circle: document.querySelectorAll(`.set_location .ctn .steps :nth-child(3) > :nth-child(2)`)[0],
                    },
                };
                let submit_button = document.querySelectorAll(`.set_location .ctn .btn`)[0];
                // get token
                let get_token = yield fetch(`https://www.universal-tutorial.com/api/getaccesstoken`, {
                    headers: {
                        "Accept": "application/json",
                        "api-token": "xQeXKM_Kb3SWBqjKkGOzr3Ah39FKdT3llXT9xjPe704m5y2RiayFgAwlKaHlz94W3Hg",
                        "user-email": "akkeybeats@gmail.com"
                    }
                });
                let token = yield get_token.json();
                // get countrys
                let get_countrys = yield fetch(`https://www.universal-tutorial.com/api/countries`, {
                    headers: {
                        "Authorization": "Bearer " + token.auth_token,
                        "Accept": "application/json"
                    }
                });
                let countrys_data = yield get_countrys.json();
                // display countrys_data
                for (let i = 0; i < countrys_data.length; i++) {
                    options.countrys.input.innerHTML += yield `<option value="${countrys_data[i].country_name}">${countrys_data[i].country_name}</option>`;
                }
                options.countrys.load.style.display = yield `none`;
                options.countrys.input.style.display = yield `block`;
                // step 1
                steps.step_1.circle.style.backgroundColor = yield `#232635`;
                steps.step_1.circle.style.color = yield `#fff`;
                // get sides function
                function get_sides() {
                    return __awaiter(this, void 0, void 0, function* () {
                        // step 2
                        steps.step_2.line.style.backgroundColor = yield `#fff`;
                        steps.step_2.circle.style.backgroundColor = yield `#fff`;
                        steps.step_2.circle.style.color = yield `#232635`;
                        // step 3
                        steps.step_3.line.style.backgroundColor = yield `#fff`;
                        steps.step_3.circle.style.backgroundColor = yield `#fff`;
                        steps.step_3.circle.style.color = yield `#232635`;
                        // data entry user
                        data_user.country = yield options.countrys.input.value;
                        data_user.side = yield ``;
                        data_user.city = yield ``;
                        // load sides
                        options.sides.load.style.display = yield `flex`;
                        options.sides.input.style.display = yield `none`;
                        options.citys.load.style.display = yield `none`;
                        options.citys.input.style.display = yield `none`;
                        // get side
                        let get_sides = yield fetch(`https://www.universal-tutorial.com/api/states/${data_user.country}`, {
                            headers: {
                                "Authorization": "Bearer " + token.auth_token,
                                "Accept": "application/json"
                            }
                        });
                        let sides_data = yield get_sides.json();
                        // display sides_data
                        options.sides.input.innerHTML = yield `<option>select side</option>`;
                        for (let i = 0; i < sides_data.length; i++) {
                            options.sides.input.innerHTML += yield `<option value="${sides_data[i].state_name}">${sides_data[i].state_name}</option>`;
                        }
                        options.sides.load.style.display = yield `none`;
                        options.sides.input.style.display = yield `block`;
                        // step 2 active
                        steps.step_2.line.style.backgroundColor = `#232635`;
                        steps.step_2.circle.style.backgroundColor = `#232635`;
                        steps.step_2.circle.style.color = `#fff`;
                    });
                }
                options.countrys.input.addEventListener(`input`, get_sides);
                // get citys function
                function get_citys() {
                    return __awaiter(this, void 0, void 0, function* () {
                        // step 3
                        steps.step_3.line.style.backgroundColor = yield `#fff`;
                        steps.step_3.circle.style.backgroundColor = yield `#fff`;
                        steps.step_3.circle.style.color = yield `#232635`;
                        // data entry user
                        data_user.side = yield options.sides.input.value;
                        data_user.city = yield ``;
                        // load citys
                        options.citys.load.style.display = yield `flex`;
                        options.citys.input.style.display = yield `none`;
                        // get citys
                        let get_citys = yield fetch(`https://www.universal-tutorial.com/api/cities/${data_user.side}`, {
                            headers: {
                                "Authorization": "Bearer " + token.auth_token,
                                "Accept": "application/json"
                            }
                        });
                        let citys_data = yield get_citys.json();
                        // display sides_data
                        options.citys.input.innerHTML = yield `<option>select city</option>`;
                        for (let i = 0; i < citys_data.length; i++) {
                            options.citys.input.innerHTML += yield `<option value="${citys_data[i].city_name}">${citys_data[i].city_name}</option>`;
                        }
                        options.citys.load.style.display = yield `none`;
                        options.citys.input.style.display = yield `block`;
                        // step 2 active
                        steps.step_3.line.style.backgroundColor = yield `#232635`;
                        steps.step_3.circle.style.backgroundColor = yield `#232635`;
                        steps.step_3.circle.style.color = yield `#fff`;
                    });
                }
                options.sides.input.addEventListener(`input`, get_citys);
                options.citys.input.addEventListener(`input`, () => {
                    // data entry user
                    data_user.city = options.citys.input.value;
                    // display button submit
                    submit_button.style.display = `block`;
                });
            }
            catch (error) {
                components.conntent.innerHTML = components.error;
                console.log(error);
            }
        });
    }
    set_location();
}
prayer_tiling();
//# sourceMappingURL=main.js.map