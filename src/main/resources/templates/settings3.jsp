<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>🧙‍♂️ Arcana on Solana</title>
    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/navbar-fixed/">

    <!-- Bootstrap core CSS -->
    <link href="/static/bootstrap.min.css" rel="stylesheet">

    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }

        .toast-container {
            position: fixed;
            bottom: 0;
            right: 0;
            z-index: 9999;
        }
    </style>

</head>

    <!-- Custom styles for this template -->
    <link href="/static/navbar-top-fixed.css" rel="stylesheet">

<body>

<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">🧙‍♂️ Arcana</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/bots/add">✨ Strategies</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/openbook">OpenBook</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/settings">Settings</a>
                </li>
            </ul>
            <div class="d-flex navbar-text">
                RPC: <span th:text="${rpcEndpoint}" style="padding-left: 4px"></span>
            </div>
        </div>
    </div>
</nav>

<main class="container">
    <div class="bg-light p-5 rounded">
        <h2>Settings</h2>
        <div class="input-group mb-3">
            <form class="form-signin" method="POST" action="/settings" autocomplete="off" autocapitalize="none">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="rpc-server-text">RPC Server</span>
                </div>
                <label>
                    <input class="form-control" type="text" required aria-describedby="rpc-server-text" name="rpc">
                </label>
                <button class="btn btn-primary btn-block" type="submit">Save</button>
            </form>
        </div>
        <hr>
        <div class="input-group mb-3">
            Current account: <span th:text="${tradingAccountPubkey}"></span><br>
        </div>
        <hr>
        <div class="input-group mb-3">
            <form method="POST" action="/privateKeyUpload" enctype="multipart/form-data">
                Private Key (File): <input type="file" name="file"/><br/><br/>
                <input type="submit" class="btn btn-primary btn-block" value="Upload Private Key (File)"/>
            </form>
        </div>
        <hr>
        <div class="input-group mb-3">
            <form method="POST" action="/privateKeyPost" autocomplete="off" autocapitalize="none">
                Private Key (Base58): <input type="text" name="privateKey"/><br/><br/>
                <input type="submit" class="btn btn-primary btn-block" value="Upload Private Key (Base58)"/>
            </form>
        </div>
    </div>
</main>

<script src="/static/bootstrap.bundle.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const rpcForm = document.querySelector("form[action='/settings']");
    const privateKeyForm = document.querySelector("form[action='/privateKeyPost']");
    const toastContainer = document.querySelector('.toast-container');

    const showToastAndSubmit = function(event, form) {
      event.preventDefault();
      const toastElement = document.createElement('div');
      toastElement.className = 'toast align-items-center border-0';
      toastElement.setAttribute('role', 'alert');
      toastElement.setAttribute('aria-live', 'assertive');
      toastElement.setAttribute('aria-atomic', 'true');
      toastElement.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            Submitting details...
          </div>
              <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
        </div>`;
      toastContainer.appendChild(toastElement);
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
      // Manually submit the form after a short delay to allow the toast to show
      setTimeout(() => {
        form.submit();
      }, 2000); // 2 seconds
    };

    rpcForm.addEventListener("submit", function(event) {
      showToastAndSubmit(event, rpcForm);
    });
    privateKeyForm.addEventListener("submit", function(event) {
      showToastAndSubmit(event, privateKeyForm);
    });
  });
</script>

<div class="toast-container">
  <!-- Toasts will be dynamically appended here -->
</div>

</body>
</html>
