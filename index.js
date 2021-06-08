(function () {
  const picsEl = document.querySelector('.pics');
  const loaderEl = document.querySelector('.loader');

  // get the pics from API
  const getPics = async (page, limit) => {
    // const API_URL = `https://api.javascripttutorial.net/v1/pics/?page=${page}&limit=${limit}`;
    const API_URL = ` https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    const response = await fetch(API_URL);
    console.log(response);
    // handle 404
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
  };

  // show the pics
  const showPics = (pics) => {
    //   let before;
    pics.forEach((pic) => {
      const picEl = document.createElement('div');
        picEl.classList.add('col-lg-4');
        picEl.classList.add('col-md-4');
        picEl.classList.add('col-sm-12');
      picEl.innerHTML = `
        <div class="wrap">
            <div class="el">
                <img src="${pic.download_url}"
                    class="rounded"
                    width="500px"
                    height="500px"
                    alt="${pic.author}"
                />
                <div class="text-right label font-weigth-bold" style="font-size:1.2rem;">
                  Author: ${pic.author}
                </div>
            </div>
            </div>
            `;
      picsEl.appendChild(picEl);
    });
  };

  const hideLoader = () => {
    loaderEl.classList.remove('show');
    loaderEl.classList.add('hide');
};

const showLoader = () => {
      loaderEl.classList.remove('hide');
    loaderEl.classList.add('show');
  };

  const hasMorePics = (page, limit, total) => {
    const startIndex = (page - 1) * limit + 1;
    console.log('total:' + total);
    console.log('startIndex:' + startIndex);
    return total === 0 || startIndex < total;
  };

  // load pics
  const loadPics = async (page, limit) => {
    console.warn('load masuk');
    // show the loader
    showLoader();

    // 0.5 second later
    setTimeout(async () => {
      try {
        // if having more pics to fetch
        if (hasMorePics(page, limit, total)) {
          // call the API to get pics
          console.log(page);
          const response = await getPics(page, limit);
          // show pics
          console.log(response);
          // showPics(response.data);
          showPics(response);
          total = 100;
          // total = response.total;
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoader();
      }
    }, 500);
  };

  // control variables
  let currentPage = 1;
  const limit = 10;
  let total = 0;

  window.addEventListener(
    'scroll',
    () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight &&
        hasMorePics(currentPage, limit, total)
      ) {
        console.log('masuk');
        // console.log(scrollTop);
        // console.log(clientHeight);
        // console.log(scrollHeight);
        console.log(scrollTop + clientHeight);
        console.log(scrollHeight - 5);
        console.log(hasMorePics(currentPage, limit, total));
        currentPage++;
        loadPics(currentPage, limit);
      }
      console.log('scrolltop+height:' + scrollTop + clientHeight);
      console.log('scrollheight:' + scrollHeight);
    },
    {
      passive: true,
    }
  );

  // initialize
  loadPics(currentPage, limit);
})();
