let components = {
  conntent: document.querySelectorAll(`.contents`)[0] as HTMLElement,
  load: `
    <!-- load -->
    <div class="load">
      <i class="fa-solid fa-repeat"></i>
    </div>
    <!-- load -->
    `
  ,
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
  prayer_timing: `
  <!-- prayer timings -->
  <div class="prayer_timings">
    <!-- date -->
    <div class="date">
      <div class="ctn">
        <div class="t_l">
          <p class="t_2 time">
            <span id="month">00</span> -
            <span id="day">00</span> -
            <span id="year">0000</span>
          </p>
          <p class="t_2 local">
            <span id="city">city</span>&nbsp;/&nbsp;
            <span id="country">country</span>
          </p>
        </div>
        <button class="t_n"><span>تعديل</span> <i class="fa-solid fa-bars"></i></button>
      </div>
    </div>
    <!-- date -->
    <!-- prayer -->
    <div class="prayer">
      <div class="ctn">
        <button class="left">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <ul>
          <li class="t_2">
            <span>الفجر</span><span>00:00 (+00)</span>
          </li>
          <li class="t_2">
            <span>الضحى</span><span>00:00 (+00)</span>
          </li>            
          <li class="t_2">
            <span>الضهر</span><span>00:00 (+00)</span>
          </li>
          <li class="t_2">
            <span>العسر</span><span>00:00 (+00)</span>
          </li>            
          <li class="t_2">
            <span>المغرب</span><span>00:00 (+00)</span>
          </li>  
          <li class="t_2">
            <span>العشاء</span><span>00:00 (+00)</span>
          </li>  
        </ul>
        <button class="right">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
    <!-- prayer -->
    <!-- edite location time -->
    <div class="edite_location_time">
        <button class="btn_x">
          <i class="fa-solid fa-x"></i>
        </button>
        <h1 class="title_3">
        تعديل
        </h1>
    </div>
    <!-- edite location time -->
    <!-- plack_black -->
    <section class="plack_black"></section>
    <!-- plack_black -->
  </div>
  <!-- prayer timings -->
  `
  ,
}

// localStorage.clear()
function prayer_tiling() {

  // set_location
  async function set_location() {

    try {

      if (localStorage.getItem(`country`) && localStorage.getItem(`city`)) {

        // diplay prayer timing function
        async function display_prayer_timin() {

          try {
            
            // prayer timing data
            let date = await new Date(),
              year = date.getFullYear(),
              month = date.getMonth(),
              day = date.getDate();
            let address = await {
              country: localStorage.getItem(`country`),
              city: localStorage.getItem(`city`),
            }
            let method = 4;
            
            // diplay load
            components.conntent.innerHTML = await components.load;
    
            // get prayer timing
            let url = await `http://api.aladhan.com/v1/calendarByAddress?address=${address.city},${address.country}&method=${method}&month=${month}&year=${year}`;
            let get_prayer_timing = await fetch(url);
            let prayer_tiling_date = await get_prayer_timing.json();
            
            // diplay prayer timing
            components.conntent.innerHTML = await components.prayer_timing;
    
            // data timi
            let date_time = await {
              month: document.getElementById(`month`) as HTMLElement,
              day: document.getElementById(`day`) as HTMLElement,
              year: document.getElementById(`year`) as HTMLElement,
              city: document.getElementById(`city`) as HTMLElement,
              country: document.getElementById(`country`) as HTMLElement,
              date_timing: () => {
    
                date_time.month.innerHTML = `${month + 1}`;
                date_time.day.innerHTML = `${day}`;
                date_time.year.innerHTML = `${year}`;
    
                date_time.city.innerHTML = `${address.city}`;
                date_time.country.innerHTML = `${address.country}`;            
              }
            }
            await date_time.date_timing();
    
            // display prayer timing data
            let prayer_timing_el = await {
              fajr: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[0] as HTMLElement,
              sunrise: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[1] as HTMLElement,
              dhuhr: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[2] as HTMLElement,
              asr: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[3] as HTMLElement,
              maghrib: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[4] as HTMLElement,
              isha: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[5] as HTMLElement,
              number_index: day - 1,
            }
            prayer_timing_el.fajr.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Fajr;
            prayer_timing_el.sunrise.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Sunrise;
            prayer_timing_el.dhuhr.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Dhuhr;
            prayer_timing_el.asr.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Asr;
            prayer_timing_el.maghrib.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Maghrib;
            prayer_timing_el.isha.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Isha;
            
            // switch prayer timing
            let btns = {
              right: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn .right`)[0] as HTMLElement,
              left: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn .left`)[0] as HTMLElement,
            }

            // right
            btns.right.addEventListener(`click`, () => {
              let max = prayer_tiling_date.data.length -1;
              if (prayer_timing_el.number_index < max) {
                prayer_timing_el.number_index += 1;

                prayer_timing_el.fajr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Fajr;
                prayer_timing_el.sunrise.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Sunrise;
                prayer_timing_el.dhuhr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Dhuhr;
                prayer_timing_el.asr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Asr;
                prayer_timing_el.maghrib.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Maghrib;
                prayer_timing_el.isha.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Isha;

                date_time.day.innerHTML = `${prayer_timing_el.number_index + 1}`;

              }
            })

            // left
            btns.left.addEventListener(`click`, () => {
              let min = 0;
              if (prayer_timing_el.number_index > min) {
                prayer_timing_el.number_index -= 1;

                prayer_timing_el.fajr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Fajr;
                prayer_timing_el.sunrise.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Sunrise;
                prayer_timing_el.dhuhr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Dhuhr;
                prayer_timing_el.asr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Asr;
                prayer_timing_el.maghrib.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Maghrib;
                prayer_timing_el.isha.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Isha;

                date_time.day.innerHTML = `${prayer_timing_el.number_index + 1}`;

              }
            })

            await edite_prayer_timing();

            

          } catch (error) {
            components.conntent.innerHTML = components.error;
            console.log(
              error
            );
          }

        }
        display_prayer_timin();

      } else {
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

          // display button submit
          submit_button.style.display = await `none`;

          // data entry user
          data_user.country = await options.countrys.input.value;
          data_user.side = await ``;
          data_user.city = await ``;
          await localStorage.setItem(`country`, `${options.countrys.input.value}`);

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

          // display button submit
          submit_button.style.display = await `none`;

          // data entry user
          data_user.side = await options.sides.input.value;
          data_user.city = await ``;
          await localStorage.setItem(`side`, `${options.sides.input.value}`);

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

        options.citys.input.addEventListener(`input`, async () => {
          // data entry user
          data_user.city = await options.citys.input.value;
          await localStorage.setItem(`city`, `${options.citys.input.value}`);

          // display button submit
          submit_button.style.display = await `block`;

        })

        // diplay prayer timing function
        async function display_prayer_timin() {

          // prayer timing data
          let date = await new Date(),
            year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate();
          let address = await {
            country: data_user.country,
            city: data_user.city,
          }
          let method = 4;
          
          // diplay load
          components.conntent.innerHTML = await components.load;

          // get prayer timing
          let url = await `http://api.aladhan.com/v1/calendarByAddress?address=${address.city},${address.country}&method=${method}&month=${month}&year=${year}`;
          let get_prayer_timing = await fetch(url);
          let prayer_tiling_date = await get_prayer_timing.json();
          
          // diplay prayer timing
          components.conntent.innerHTML = await components.prayer_timing;

          // data timi
          let date_time = await {
            month: document.getElementById(`month`) as HTMLElement,
            day: document.getElementById(`day`) as HTMLElement,
            year: document.getElementById(`year`) as HTMLElement,
            city: document.getElementById(`city`) as HTMLElement,
            country: document.getElementById(`country`) as HTMLElement,
            date_timing: () => {

              date_time.month.innerHTML = `${month + 1}`;
              date_time.day.innerHTML = `${day}`;
              date_time.year.innerHTML = `${year}`;

              date_time.city.innerHTML = `${address.city}`;
              date_time.country.innerHTML = `${address.country}`;            
            }
          }
          await date_time.date_timing();

          // display prayer timing data
          let prayer_timing_el = await {
            fajr: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[0] as HTMLElement,
            sunrise: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[1] as HTMLElement,
            dhuhr: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[2] as HTMLElement,
            asr: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[3] as HTMLElement,
            maghrib: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[4] as HTMLElement,
            isha: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn ul li`)[5] as HTMLElement,
            number_index: day - 1,
          }
          prayer_timing_el.fajr.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Fajr;
          prayer_timing_el.sunrise.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Sunrise;
          prayer_timing_el.dhuhr.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Dhuhr;
          prayer_timing_el.asr.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Asr;
          prayer_timing_el.maghrib.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Maghrib;
          prayer_timing_el.isha.children[1].innerHTML = await prayer_tiling_date.data[prayer_timing_el.number_index].timings.Isha;

          // switch prayer timing
          let btns = {
            right: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn .right`)[0] as HTMLElement,
            left: document.querySelectorAll(`.contents .prayer_timings .prayer .ctn .left`)[0] as HTMLElement,
          }

          // right
          btns.right.addEventListener(`click`, () => {

            let max = prayer_tiling_date.data.length -1;
            if (prayer_timing_el.number_index < max) {
              prayer_timing_el.number_index += 1;

              prayer_timing_el.fajr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Fajr;
              prayer_timing_el.sunrise.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Sunrise;
              prayer_timing_el.dhuhr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Dhuhr;
              prayer_timing_el.asr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Asr;
              prayer_timing_el.maghrib.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Maghrib;
              prayer_timing_el.isha.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Isha;

              date_time.day.innerHTML = `${prayer_timing_el.number_index + 1}`;

            }

          })

          // left
          btns.left.addEventListener(`click`, () => {

            let min = 0;
            if (prayer_timing_el.number_index > min) {
              prayer_timing_el.number_index -= 1;

              prayer_timing_el.fajr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Fajr;
              prayer_timing_el.sunrise.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Sunrise;
              prayer_timing_el.dhuhr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Dhuhr;
              prayer_timing_el.asr.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Asr;
              prayer_timing_el.maghrib.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Maghrib;
              prayer_timing_el.isha.children[1].innerHTML = prayer_tiling_date.data[prayer_timing_el.number_index].timings.Isha;

              date_time.day.innerHTML = `${prayer_timing_el.number_index + 1}`;
  
            }

          })

          await edite_prayer_timing();



        }

        submit_button.addEventListener(`click`, display_prayer_timin);
      }

    } catch (error: any) {
      components.conntent.innerHTML = components.error;
      console.log(
        error
      );
    }

  }
  set_location();


}
prayer_tiling();

// edite_prayer_timing
function edite_prayer_timing() {

  let open_clos = {
    btn: document.querySelectorAll(`.contents .prayer_timings .date .ctn button`)[0] as HTMLElement,
    edite_location_time: document.querySelectorAll(`.prayer_timings .edite_location_time`)[0] as HTMLElement,
    plack_black: document.querySelectorAll(`.prayer_timings .plack_black`)[0] as HTMLElement,
    x: document.querySelectorAll(`.prayer_timings .edite_location_time .btn_x i`)[0] as HTMLElement,
  }
  open_clos.btn.addEventListener(`click`, () => {

    open_clos.edite_location_time.style.transform = `translateX(0%)`;
    open_clos.plack_black.style.zIndex = `100`;
    open_clos.x.addEventListener(`click`, () => {
      open_clos.edite_location_time.style.transform = `translateX(100%)`;
      open_clos.plack_black.style.zIndex = `-1`;                
    })
    open_clos.plack_black.addEventListener(`click`, () => {
      open_clos.edite_location_time.style.transform = `translateX(100%)`;
      open_clos.plack_black.style.zIndex = `-1`;                
    })
  })

}