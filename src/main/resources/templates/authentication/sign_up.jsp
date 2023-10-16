<!DOCTYPE html>
<html lang="en-US" dir="ltr">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- ===============================================-->
    <!--    Document Title-->
    <!-- ===============================================-->
    <title>Arcana Markets</title>


    <!-- ===============================================-->
    <!--    Favicons-->
    <!-- ===============================================-->
    <link rel="apple-touch-icon" sizes="180x180" href="/static/img/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicons/favicon-16x16.png">
    <link rel="shortcut icon" type="image/x-icon" href="/static/img/favicons/favicon.ico">
    <link rel="manifest" href="/static/img/favicons/manifest.json">
    <meta name="msapplication-TileImage" content="/static/img/favicons/mstile-150x150.png">
    <meta name="theme-color" content="#ffffff">
    <script src="/static/vendors/imagesloaded/imagesloaded.pkgd.min.js"></script>
    <script src="/static/vendors/simplebar/simplebar.min.js"></script>
    <script src="/static/config.js"></script>


    <!-- ===============================================-->
    <!--    Stylesheets-->
    <!-- ===============================================-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&amp;display=swap" rel="stylesheet">
    <link href="/static/vendors/simplebar/simplebar.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <link href="/static/css/theme.min.css" type="text/css" rel="stylesheet" id="style-default">

  </head>


  <body>

    <!-- ===============================================-->
    <!--    Main Content-->
    <!-- ===============================================-->
    <main class="main" id="top">
      <div class="container">
        <div class="row flex-center min-vh-100 py-5">
          <div class="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3"><a class="d-flex flex-center text-decoration-none mb-4" href="index.html">
              <div class="d-flex align-items-center fw-bolder fs-5 d-inline-block"><img src="/static/img/icons/arcana-logo-nobg.png" alt="phoenix" width="58" />
              </div>
            </a>
            <div class="text-center mb-7">
              <h3 class="text-1000">Sign Up</h3>
              <p class="text-700">Create your account today</p>
            </div>
            <button class="btn btn-phoenix-secondary w-100 mb-3"><span class="fab fa-google text-danger me-2 fs--1"></span>Sign up with google</button>
            <button class="btn btn-phoenix-secondary w-100"><span class="fab fa-facebook text-primary me-2 fs--1"></span>Sign up with facebook</button>
            <div class="position-relative mt-4">
              <hr class="bg-200" />
              <div class="divider-content-center">or use email</div>
            </div>
            <form>
              <div class="mb-3 text-start">
                <label class="form-label" for="name">Name</label>
                <input class="form-control" id="name" type="text" placeholder="Name" />
              </div>
              <div class="mb-3 text-start">
                <label class="form-label" for="email">Email address</label>
                <input class="form-control" id="email" type="email" placeholder="name@example.com" />
              </div>
              <div class="row g-3 mb-3">
                <div class="col-sm-6">
                  <label class="form-label" for="password">Password</label>
                  <input class="form-control form-icon-input" id="password" type="password" placeholder="Password" />
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="confirmPassword">Confirm Password</label>
                  <input class="form-control form-icon-input" id="confirmPassword" type="password" placeholder="Confirm Password" />
                </div>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" id="termsService" type="checkbox" />
                <label class="form-label fs--1 text-none" for="termsService">I accept the <a href="#!">terms </a>and <a href="#!">privacy policy</a></label>
              </div>
              <button class="btn btn-primary w-100 mb-3">Sign up</button>
              <div class="text-center"><a class="fs--1 fw-bold" href="../../../pages/authentication/simple/sign-in.html">Sign in to an existing account</a></div>
            </form>
          </div>
        </div>
      </div>
      <script>
        var navbarTopStyle = window.config.config.phoenixNavbarTopStyle;
        var navbarTop = document.querySelector('.navbar-top');
        if (navbarTopStyle === 'darker') {
          navbarTop.classList.add('navbar-darker');
        }

        var navbarVerticalStyle = window.config.config.phoenixNavbarVerticalStyle;
        var navbarVertical = document.querySelector('.navbar-vertical');
        if (navbarVertical && navbarVerticalStyle === 'darker') {
          navbarVertical.classList.add('navbar-darker');
        }
      </script>
      </div>
    </main>
    <!-- ===============================================-->
    <!--    End of Main Content-->
    <!-- ===============================================-->

    <!-- ===============================================-->
    <!--    JavaScripts-->
    <!-- ===============================================-->
    <script src="/static/vendors/popper/popper.min.js"></script>
    <script src="/static/vendors/bootstrap/bootstrap.min.js"></script>
    <script src="/static/vendors/anchorjs/anchor.min.js"></script>
    <script src="/static/vendors/is/is.min.js"></script>
    <script src="/static/vendors/fontawesome/all.min.js"></script>
    <script src="/static/vendors/lodash/lodash.min.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
    <script src="/static/vendors/list.js/list.min.js"></script>
    <script src="/static/vendors/feather-icons/feather.min.js"></script>
    <script src="/static/vendors/dayjs/dayjs.min.js"></script>
    <script src="/static/phoenix.js"></script>

  </body>

</html>