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
    <script src="/static/js/config.js"></script>


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
      <nav class="navbar navbar-vertical navbar-expand-lg">
        <script>
          var navbarStyle = window.config.config.phoenixNavbarStyle;
          if (navbarStyle && navbarStyle !== 'transparent') {
            document.querySelector('body').classList.add(`navbar-${navbarStyle}`);
          }
        </script>
        <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
          <!-- scrollbar removed-->
          <div class="navbar-vertical-content">
            <ul class="navbar-nav flex-column" id="navbarVerticalNav">
              <li class="nav-item">
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" href="/" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="home"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Home</span></span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" href="/" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="play"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Getting started</span></span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-faq" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-faq">
                      <div class="d-flex align-items-center">
                          <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><img src="/static/img/bootstrap-icons/robot.svg" alt="Robot" ...></span><span class="nav-link-text">Trading Bots</span><span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span>
                      </div>
                  </a>
                      <div class="parent-wrapper label-1">
                          <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-faq">
                              <li class="collapsed-nav-item-title d-none">Trading Bots
                              </li>
                              <li class="nav-item"><a class="nav-link" href="/bots" data-bs-toggle="" aria-expanded="false">
                                  <div class="d-flex align-items-center"><span class="nav-link-text">My Bots</span>
                                  </div>
                              </a>
                                  <!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="/bots/add" data-bs-toggle="" aria-expanded="false">
                                  <div class="d-flex align-items-center"><span class="nav-link-text">The Wizard</span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info ">New</span>
                                  </div>
                              </a>
                                  <!-- more inner pages-->
                              </li>
                          </ul>
                      </div>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" href="../../widgets.html" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="pocket"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Quests</span></span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" href="/market-list" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="bar-chart"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Markets</span></span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info nav-link-badge">New</span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" href="/settings" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="settings"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Settings</span></span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" href="https://arcana.markets" a target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="book"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Documentation</span></span>
                      </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="navbar-vertical-footer">
          <button class="btn navbar-vertical-toggle border-0 fw-semi-bold w-100 white-space-nowrap d-flex align-items-center"><span class="uil uil-left-arrow-to-left fs-0"></span><span class="uil uil-arrow-from-right fs-0"></span><span class="navbar-vertical-footer-text ms-2">Collapsed View</span></button>
        </div>
      </nav>
      <nav class="navbar navbar-top fixed-top navbar-expand" id="navbarDefault">
        <div class="collapse navbar-collapse justify-content-between">
          <div class="navbar-logo">

            <button class="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
            <a class="navbar-brand ms-0 me-1 me-sm-3" href="/index">
              <div class="d-flex align-items-center">
                <div class="d-flex align-items-center"><img src="/static/img/icons/arcana-icon-outline.png" alt="arcana" style="margin-left: -14px;" width="50" />
                  <p class="logo-text ms-2 d-none d-sm-block">arcana</p>
                </div>
              </div>
            </a>
          </div>
          <ul class="navbar-nav navbar-nav-icons flex-row">
            <li class="nav-item">
              <div class="theme-control-toggle fa-icon-wait px-2">
                <input class="form-check-input ms-0 theme-control-toggle-input" type="checkbox" data-theme-control="phoenixTheme" value="dark" id="themeControlToggle" />
                <label class="mb-0 theme-control-toggle-label theme-control-toggle-light" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch theme"><span class="icon" data-feather="moon"></span></label>
                <label class="mb-0 theme-control-toggle-label theme-control-toggle-dark" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch theme"><span class="icon" data-feather="sun"></span></label>
              </div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link lh-1 pe-0" id="navbarDropdownUser" href="#!" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                <div class="avatar avatar-l ">
                  <img class="rounded-circle " src="/static/img/team/KismetToad.png" alt="" />

                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border border-300" aria-labelledby="navbarDropdownUser">
                <div class="card position-relative border-0">
                  <div class="card-body p-0">
                    <div class="text-center pt-4 pb-3">
                      <div class="avatar avatar-xl ">
                        <img class="rounded-circle " src="/static/img/team/KismetToad.png" alt="" />

                      </div>
                      <h6 class="mt-2 text-black">kizz</h6>
                        <hr/>
                    </div>
                  </div>
                  <div class="overflow-auto scrollbar" style="height: 10rem;">
                    <ul class="nav d-flex flex-column mb-2 pb-1">
                      <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="user"></span><span>Profile</span></a></li>
                      <li class="nav-item"><a class="nav-link px-3" href="#!"><span class="me-2 text-900" data-feather="pie-chart"></span>Dashboard</a></li>
                      <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="settings"></span>Settings</a></li>
                    </ul>
                  </div>
                  <div class="card-footer pt-2 p-0 border-top">
                    <div class="px-3"> <a class="btn btn-phoenix-secondary d-flex flex-center w-100" href="#!"> <span class="me-2" data-feather="log-out"> </span>Sign out</a></div>
                    <div class="my-2 text-center fw-bold fs--2 text-600"><a class="text-600 me-1" href="#!">Privacy policy</a>&bull;<a class="text-600 mx-1" href="#!">Terms</a>&bull;<a class="text-600 ms-1" href="#!">Cookies</a></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="content">
        <div class="mb-9">
          <div class="row g-6">
            <div class="col-12 col-xl-6">
              <div class="card mb-5">
                <div class="card-header hover-actions-trigger position-relative mb-6" style="min-height: 130px; ">
                  <div class="bg-holder rounded-top" style="background-image: linear-gradient(0deg, #000000 -3%, rgba(0, 0, 0, 0) 83%), url(/static/img/banners/tester52.png)">
                    <input class="d-none" id="upload-settings-cover-image" type="file" />
                    <label class="cover-image-file-input" for="upload-settings-cover-image"></label>
                    <div class="hover-actions end-0 bottom-0 pe-1 pb-2 text-white" ><span class="fa-solid fa-camera me-2"></span></div>
                  </div>
                  <input class="d-none" id="upload-settings-profile-picture" type="file" />
                  <label class="avatar avatar-4xl status-online feed-avatar-profile cursor-pointer" for="upload-settings-profile-picture"><img class="rounded-circle img-thumbnail bg-white shadow-sm" src="/static/img/team/KismetToad.png" width="200" alt="" /></label>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex flex-wrap mb-2 align-items-center">
                        <h3 class="me-2">kiz</h3><span class="fw-normal fs-0">kizmet.sol</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <h2 class="mb-4">Account Settings</h2>
                <hr/>
                <h4 class="mb-2">RPC Configuration</h4>
                <p class="text-700">Upload your unique RPC URL to power your Arcana Bot.</p>
                <div class="input-group">
                    <form class="form-signin row row-cols-lg-auto g-3 align-items-center" method="POST" action="/settings" autocomplete="off" autocapitalize="none">
                        <div class="col-12 form-icon-container">
                            <div class="input-group">
                                <input type="text" class="form-control" required aria-describedby="rpc-server-text" placeholder="RPC URL">
                            </div>
                        </div>
                        <div class="col-12" style="z-index: 1;">
                        <button class="btn btn-secondary btn-sm" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                        </button>
                        </div>
                    </form>
                    <div class="input-group mt-3">
                        <h5 class="mt-2">Active Connection:</h5>
                        <span text="${tradingAccountPubkey}"></span><br>
                    </div>
                </div>
                <div class="border-bottom border-dashed pb-3 mb-4"></div>
                <h4 class="mb-2">Wallet Configuration</h4>
                <p class="text-700">Connect the Solana Wallet(s) you wish to trade with Arcana Bot.</p>
                <div class="border-bottom border-dashed mb-4"></div>
                <h5 class="mb-2">Private Keys</h5>
                <p class="text-700">Paste directly from Phantom wallet. It's quick, easy, and secure.</p>
                <div class="input-group mb-3">
                    <form class="row row-cols-lg-auto g-3 align-items-center" method="POST" action="/privateKeyPost" autocomplete="off" autocapitalize="none">
                            <div class="col-12 form-icon-container">
                                <div class="input-group">
                                    <input type="password" class="form-control" required aria-describedby="rpc-server-text" id="inlineFormInputGroupUsername" placeholder="Private Key (Base58)">
                                </div>
                            </div>
                        <div class="col-12" style="z-index: 1;">
                        <button type="submit" class="btn btn-secondary btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <p class="text-700">Alternatively upload from a local device for CLI users.</p>
                <div class="input-group mb-3">
                    <form class="row row-cols-lg-auto g-3 align-items-center" method="POST" action="/privateKeyUpload" enctype="multipart/form-data" autocomplete="off" autocapitalize="none">
                        <div class="col-12 form-icon-container">
                            <div class="input-group mb-2">
                                <input class="form-control" required type="file" id="formFile">
                            </div>
                        </div>
                        <div class="col-12" style="z-index: 1;">
                            <button type="submit" class="btn btn-secondary btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="input-group mb-2">
                    <h4 class="mt-2">Active Accounts:</h4>
                    <span text="${tradingAccountPubkey}"></span><br>
                </div>
              <div class="border-bottom border-dashed pb-3 mb-4"></div>
                <div class="form-check form-switch">
                  <input class="form-check-input" id="showPhone" type="checkbox" checked="checked" name="showPhone" />
                  <label class="form-check-label fs-0" for="showPhone">Receive updates via Email.</label>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" id="permitFollow" type="checkbox" checked="checked" name="permitFollow" />
                  <label class="form-check-label fs-0" for="permitFollow">Track my trading volume.</label>
                </div>
              </div>
            </div>
            <div class="border-bottom border-dashed pb-3 mb-4"></div>
            <div class="col-12 col-xl-8">
              <div class="border-bottom border-300 mb-4">
                <div class="mb-6">
                  <div class="col-12 col-sm-6">
                    <h4 class="mb-4">Change Password</h4>
                    <div class="form-icon-container mb-3">
                      <div class="form-floating">
                        <input class="form-control form-icon-input" id="oldPassword" type="password" placeholder="Old password" />
                        <label class="text-700 form-icon-label" for="oldPassword">Old Password</label>
                      </div><span class="fa-solid fa-lock text-900 fs--1 form-icon"></span>
                    </div>
                    <div class="form-icon-container mb-3">
                      <div class="form-floating">
                        <input class="form-control form-icon-input" id="newPassword" type="password" placeholder="New password" />
                        <label class="text-700 form-icon-label" for="newPassword">New Password</label>
                      </div><span class="fa-solid fa-key text-900 fs--1 form-icon"></span>
                    </div>
                    <div class="form-icon-container">
                      <div class="form-floating">
                        <input class="form-control form-icon-input" id="newPassword2" type="password" placeholder="Confirm New password" />
                        <label class="text-700 form-icon-label" for="newPassword2">Confirm New Password</label>
                      </div><span class="fa-solid fa-key text-900 fs--1 form-icon"></span>
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <div>
                    <button class="btn btn-phoenix-secondary me-2">Cancel Changes</button>
                    <button class="btn btn-phoenix-primary">Save Information</button>
                  </div>
                </div>
              </div>
              <div class="row gy-5 mt-2">
                <div class="col-12 col-md-6">
                  <h4 class="text-black">Transfer Ownership</h4>
                  <p class="text-700">Transfer this account to another person or to a company repository.</p>
                  <button class="btn btn-phoenix-warning">Transfer</button>
                </div>
                <div class="col-12 col-md-6">
                  <h4 class="text-black">Account Deletion</h4>
                  <p class="text-700">Transfer this account to another person or to a company repository.</p>
                  <button class="btn btn-phoenix-danger">Delete account</button>
                </div>
              </div>
            </div>
          </div>

        <footer class="footer position-fixed bg-white z-index-2">
            <div class="row g-0 justify-content-between align-items-center h-100">
                <div class="col-12 col-sm-auto text-center" >
                    <p class="mb-0 mt-2 mt-sm-0 text-400 " style="font-size: 14px">&copy; Arcana Markets<span class="d-none d-sm-inline-block"></span><span class="d-none d-sm-inline-block mx-1">|</span><br class="d-sm-none" />2023 </p>
                </div>
                <div class="col-12 col-sm-auto text-center">

                    <div class="nav-item-wrapper"><a class="nav-link" href="https://x.com/arcanamarkets" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                        <div class="d-flex align-items-center">
                            <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                            <div class="nav-item-wrapper"><a class="nav-link" href="https://x.com/arcanamarkets" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/twitter-x.svg" alt="Twitter/X" >
                            </span>
                                </div>
                            </a>
                            </div>
                            <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                            <div class="nav-item-wrapper"><a class="nav-link" href="https://discord.gg/VUFVCEAm" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/discord.svg" alt="Discord" >
                            </span>
                                </div>
                            </a>
                            </div>
                            <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                            <div class="nav-item-wrapper"><a class="nav-link" href="https://github.com/makolabs-xyz/arcana" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/telegram.svg" alt="Telegram" >
                            </span>
                                </div>
                            </a>
                            </div>
                            <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                            <div class="nav-item-wrapper"><a class="nav-link" href="https://github.com/makolabs-xyz/arcana" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/github.svg" alt="GitHub" >
                            </span>
                                </div>
                            </a>
                            </div>
                            <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                            <div class="nav-item-wrapper"><a class="nav-link" href="https://discord.gg/VUFVCEAm" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/envelope.svg" alt="Email" >
                            </span>
                                </div>
                            </a>
                            </div>
                        </div>
                    </a>
                    </div>
                </div>
            </div>
        </footer>
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
    <script src="/static/js/phoenix.js"></script>

  </body>

</html>