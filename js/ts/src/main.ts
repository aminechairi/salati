let components = {
  conntent: document.querySelectorAll(`.contents`)[0] as HTMLElement,
  error: `
    <!-- error -->
    <div class="error">
      <h1 class="title_1">تعذر علينا إكمال طلبك</h1>
      <button class="t_2">يرجى محاولة إعادة تحميل الصفحة</button>
    </div>
    <!-- error -->
    `
  ,
  set_location:  `
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
}
function prayer_tiling() {

  // set_location
  async function set_location() {
    try {
      // data_user
      let data_user = {
        country: ``,
        side: ``,
        city: ``,
      }

      // display set_location;
      components.conntent.innerHTML = components.set_location;

      // inputs & loads
      let  options = {
        countrys: {
          input: document.querySelectorAll(`.set_location .ctn .options > :nth-child(1) > :nth-child(1)`)[0] as HTMLInputElement,
          load: document.querySelectorAll(`.set_location .ctn .options > :nth-child(1) > :nth-child(2) `)[0] as HTMLElement,
        },
        sides: {
          input: document.querySelectorAll(`.set_location .ctn .options > :nth-child(2) > :nth-child(1)`)[0] as HTMLInputElement,
          load: document.querySelectorAll(`.set_location .ctn .options > :nth-child(2) > :nth-child(2) `)[0] as HTMLElement,
        },
        citys: {
          input: document.querySelectorAll(`.set_location .ctn .options > :nth-child(3) > :nth-child(1)`)[0] as HTMLInputElement,
          load: document.querySelectorAll(`.set_location .ctn .options > :nth-child(3) > :nth-child(2) `)[0] as HTMLElement,
        },
      }

      // steps 
      let steps = {
        step_1: {
          circle: document.querySelectorAll(`.set_location .ctn .steps > :nth-child(1) > :nth-child(1)`)[0] as HTMLElement,
        },
        step_2: {
          line: document.querySelectorAll(`.set_location .ctn .steps :nth-child(2) > :nth-child(1)`)[0] as HTMLElement,
          circle: document.querySelectorAll(`.set_location .ctn .steps :nth-child(2) > :nth-child(2)`)[0] as HTMLElement,
        },
        step_3: {
          line: document.querySelectorAll(`.set_location .ctn .steps :nth-child(3) > :nth-child(1)`)[0] as HTMLElement,
          circle: document.querySelectorAll(`.set_location .ctn .steps :nth-child(3) > :nth-child(2)`)[0] as HTMLElement,
        },
      }

      let submit_button = document.querySelectorAll(`.set_location .ctn .btn`)[0] as HTMLButtonElement;
      // get token
      let get_token = await fetch(`https://www.universal-tutorial.com/api/getaccesstoken`, {
      headers: {
        "Accept": "application/json",
        "api-token": "xQeXKM_Kb3SWBqjKkGOzr3Ah39FKdT3llXT9xjPe704m5y2RiayFgAwlKaHlz94W3Hg",
        "user-email": "akkeybeats@gmail.com"
        }
      })
      let token = await get_token.json();
      
      // get countrys
      let get_countrys = await fetch(`https://www.universal-tutorial.com/api/countries`, {
        headers: {
          "Authorization": "Bearer " + token.auth_token,
          "Accept": "application/json"
        }
      })
      let countrys_data = await get_countrys.json();
      
      // display countrys_data
      for (let i = 0; i < countrys_data.length; i++) {
        options.countrys.input.innerHTML += await `<option value="${countrys_data[i].country_name}">${countrys_data[i].country_name}</option>`;
      }
      options.countrys.load.style.display = await `none`;
      options.countrys.input.style.display = await `block`;

      // step 1
      steps.step_1.circle.style.backgroundColor = await `#232635`;
      steps.step_1.circle.style.color = await `#fff`;

      // get sides function
      async function get_sides() {
        
        // step 2
        steps.step_2.line.style.backgroundColor = await `#fff`;
        steps.step_2.circle.style.backgroundColor = await `#fff`;
        steps.step_2.circle.style.color = await `#232635`;

        // step 3
        steps.step_3.line.style.backgroundColor = await `#fff`;
        steps.step_3.circle.style.backgroundColor = await `#fff`;
        steps.step_3.circle.style.color = await `#232635`;

        // data entry user
        data_user.country = await options.countrys.input.value;
        data_user.side = await ``;
        data_user.city = await ``;

        // load sides
        options.sides.load.style.display = await `flex`;
        options.sides.input.style.display = await `none`;
        options.citys.load.style.display = await `none`;
        options.citys.input.style.display = await `none`;

        // get side
        let get_sides = await fetch(`https://www.universal-tutorial.com/api/states/${data_user.country}`, {
          headers: {
            "Authorization": "Bearer " + token.auth_token,
            "Accept": "application/json"
          }
        })
        let sides_data = await get_sides.json();

        // display sides_data
        options.sides.input.innerHTML = await `<option>select side</option>`;
        for (let i = 0; i < sides_data.length; i++) {
          options.sides.input.innerHTML += await `<option value="${sides_data[i].state_name}">${sides_data[i].state_name}</option>`;
        }
        options.sides.load.style.display = await `none`;
        options.sides.input.style.display = await `block`;

        // step 2 active
        steps.step_2.line.style.backgroundColor = `#232635`;
        steps.step_2.circle.style.backgroundColor = `#232635`;
        steps.step_2.circle.style.color = `#fff`;
      }
      options.countrys.input.addEventListener(`input`,get_sides)

      // get citys function
      async function get_citys() {
        
        // step 3
        steps.step_3.line.style.backgroundColor = await `#fff`;
        steps.step_3.circle.style.backgroundColor = await `#fff`;
        steps.step_3.circle.style.color = await `#232635`;

        // data entry user
        data_user.side = await options.sides.input.value;
        data_user.city = await ``;

        // load citys
        options.citys.load.style.display = await `flex`;
        options.citys.input.style.display = await `none`;

        // get citys
        let get_citys = await fetch(`https://www.universal-tutorial.com/api/cities/${data_user.side}`, {
          headers: {
            "Authorization": "Bearer " + token.auth_token,
            "Accept": "application/json"
          }
        })
        let citys_data = await get_citys.json();
        
        // display sides_data
        options.citys.input.innerHTML = await `<option>select city</option>`;
        for (let i = 0; i <citys_data.length; i++) {
          options.citys.input.innerHTML += await `<option value="${citys_data[i].city_name}">${citys_data[i].city_name}</option>`;
        }
        options.citys.load.style.display = await `none`;
        options.citys.input.style.display = await `block`;

        // step 2 active
        steps.step_3.line.style.backgroundColor = await `#232635`;
        steps.step_3.circle.style.backgroundColor = await `#232635`;
        steps.step_3.circle.style.color = await `#fff`;

      }
      options.sides.input.addEventListener(`input`,get_citys);

      options.citys.input.addEventListener(`input`, () => {
        // data entry user
        data_user.city = options.citys.input.value;

        // display button submit
        submit_button.style.display = `block`;

      })
    } catch (error: any) {
      components.conntent.innerHTML = components.error;
      console.log(
        error
      );
    }
  }
  set_location();

}
prayer_tiling()