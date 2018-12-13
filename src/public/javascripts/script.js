// var ejs = require('ejs');
$(document).ready(function () {  
  function debounce(func, ms) {
    let timer = null;
    let implementation =   function () {
      const onComplete = function ()  {
        func();
        timer = null;
      }
      if (timer) {
        clearTimeout(timer);
      }
      console.log("timer до:", timer);
      
      timer = setTimeout(onComplete, ms);
      console.log("timer после:", timer);
    };
    return implementation
  }

  function paginate() { $('table.paginated').each(function () {
    let currentPage = 0;
    let numPerPage = 5;
    var table = $(this);
    table.bind('myEvent', function () {
      table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    table.trigger('myEvent');
    var numRows = $(this).find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
      $('<span class="page-number"></span>').text(page + 1).bind('click', {
        newPage: page
      },
        function (event) {
          currentPage = event.data['newPage'];
          table.trigger('myEvent');
          $(this).addClass('active').siblings().removeClass('active');
        }).appendTo(pager);
    }
    pager.insertAfter(table).find('span.page-number:first').addClass('active');
  });
  }

  function generateSelectOptionCarYear () {
    $("#filteryearDown").append( "<option>All years</option");
    $("#filteryearUp").append( "<option>All years</option");
    for (let i = 2007; i<2018; i++) {
      $("#filteryearDown").append( "<option>"+(i+1)+"</option");
      $("#filteryearUp").append( "<option>"+(i+1)+"</option");
    }
  }

  function checkUserAdmin () { 
    if (localStorage.flagAdmin) {
      $("#adminButton").show()
    }
    else {
      $("#adminButton").hide()
    }
  }

  $("#formGenerateshortUrl").submit(function (e) {
    e.preventDefault();
    const registerForm = document.forms["formGenerateshortUrl"];
    const url = registerForm.elements["url"].value;
    const urlShorten = registerForm.elements["urlShorten"].value;
    $.ajax({
      type: "POST",
      url: "/home-page",
      data: ({ url: url, urlShorten: urlShorten }),
      dataType: "text",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
        dataParse = jQuery.parseJSON(data);
        $(".error").text(dataParse.message);
        $("#short-url").val(dataParse.hash);
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      },
    })
  })

  $("#saveDb").submit(function (e) {
    e.preventDefault();
    const registerForm = document.forms["formGenerateshortUrl"];
    const url = registerForm.elements["url"].value;
    const urlShorten = registerForm.elements["urlShorten"].value;
    $.ajax({
      type: "POST",
      url: "/home-page/savedb",
      data: ({ url: url, urlShorten: urlShorten, username: localStorage.token }),
      dataType: "text",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
        dataParse = jQuery.parseJSON(data)
        const _buildUrl = window.location.origin + "/hash/" + dataParse.hash;
        if (dataParse.hash == undefined || !dataParse.hash) { }
        else {
          $(".shortened-url").html('<a href="' + _buildUrl + '" target="_blank">' + _buildUrl + '</a>');
          $(".hide").removeClass("hide")
        }
        $(".error").text(dataParse.message);
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      },
    })
  })

  $("#exit").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/home-page/exit-account",
      dataType: "text",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
        localStorage.flagAdmin = "";
        localStorage.flag = false;  
        localStorage.token = "";  
        document.cookie = "";
        window.location.href = 'http://localhost:3000/auth'
      }
    })
  })

  $("#registr").submit(function (e) {
    e.preventDefault();
    const registerForm = document.forms["registr"];
    const login = registerForm.elements["login"].value;
    const password = registerForm.elements["password"].value;
    $.ajax({
      type: "POST",
      url: "/registr",
      data: { login: login, password: password },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
          window.location.href = 'http://localhost:3000/auth'
      },
      error:  function(err) {
        errDataParse = jQuery.parseJSON(err.responseText)
        $(".erorCreateUser").html(errDataParse.message)
        $(".hide").removeClass("hide")
      }
    })
  })

  $("#auth").submit(function (e) {
    e.preventDefault();
    const registerForm = document.forms["auth"];
    const login = registerForm.elements["login"].value;
    const password = registerForm.elements["password"].value;
    $.ajax({
      type: "POST",
      url: "/auth",
      data: ({ login: login, password: password }),
      dataType: "text",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
        dataParse = jQuery.parseJSON(data)
          localStorage.token = dataParse.token;
          document.cookie = JSON.stringify({ token: dataParse.token });
          if (dataParse.roleUser == "admin") {            
            localStorage.flagAdmin = true;
          }
          window.location.href = 'http://localhost:3000/home-page'
      },  
      error: function(err) {
        errDataParse = jQuery.parseJSON(err.responseText)
        $(".erorCreateUser").html(errDataParse.message)
        $(".hide").removeClass("hide")
      },
      // beforeSend: function (xhr) {
      //   xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      // },
    })
  })

  $("#showUrl").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/home-page/show-url",
      data: ({ token: localStorage.token }),
      dataType: "text",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {        
        $("#showUrls").html('')
        dataParse = jQuery.parseJSON(data)
        if (dataParse.result[0].username == null) {
          $(".error").text('Log in to the system')
        }
        else {
          $("#showUrls").html('<table class="table table-dark table-bordered"><thead><tr><th>#</th><th>ORIGIN URL</th><th>SHORT URL</th><th>DATE</th><th>COUNT</th></tr></thead><tbody class="asds"></tbody></table>')
          for (let i = 0; i < dataParse.result.length; i++) {
            $(".asds").append('<tr> <th scope="row">' + i + '</th><td height=50><a href="' + dataParse.result[i].url + '" target="_blank">' + dataParse.result[i].url + '</td><td height=50><a href="' + window.location.origin + '/hash/' + dataParse.result[i].urlShorten + '" target="_blank">' + window.location.origin + '/' + dataParse.result[i].urlShorten + '</td><td height=50>' + dataParse.result[i].date + '</td><td height=50>' + dataParse.result[i].count) + '</td></tr>'
          }
          $('#showUrls').show();
         
        }
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      },
      error: function(err) {
        debugger
        if ( err.responseText ){
          $('.error ').html(err.responseText)
        }

      }
    })
  })

  $("#showUrl").on('click', function () {
    $('#showUrls').toggle('slow');
  })

  $(".change-password").click(function (e) {
    $(".error").html("")
    const user = e.currentTarget.attributes["userid"].value
    const changePassword =  $("#changePassword").val()
    $.ajax({
      type: "POST",
      url: `/user/${user}`,
      data: { changePassword: changePassword, login: user },
      dataType: "text",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
        debugger
        dataParse = jQuery.parseJSON(data)
        if ( dataParse.message ){          
          $(`.${user}`).html(dataParse.message)
          $(".hide").removeClass("hide")
        }
      },      
      error: function (err) {
        if ( err.responseText){
          $(`.${user}`).html(err.responseText)
          $(".hide").removeClass("hide")
        }
      }
    })
  })

  $(".change-role").click(function (e) {
    $(".error").html("")
    const user = e.currentTarget.attributes["userid"].value
    debugger
    const changeRole = $(`select[name=${user}]`).val()
    $.ajax({
      type: "POST",
      url: "/user/role",
      data: { login: user, role: changeRole },
      dataType: "text",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
        // debugger
        dataParse = jQuery.parseJSON(data)
        if ( dataParse.message ){          
          $(`.role${user}`).html(dataParse.message)
          $(".hide").removeClass("hide")
        }
        if (changeRole !== "admin") {
          localStorage.flagAdmin = "";
        }
        else {
          localStorage.flagAdmin = true;
        }
      },      
      error: function (err) {
        if ( err.responseText ){
          $(`.role${user}`).html(err.responseText)
          $(".hide").removeClass("hide")
        }
      }
    })
  })

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
  });
 
  $( '#uploadFile' ).submit(function ( e ) {
    // var data;
    data = new FormData();
    data.append( 'avatar', $( '#file' )[0].files[0] );
    const user = e.currentTarget.attributes["userid"].value
    data.append('username',e.currentTarget.attributes["userid"].value)   
    $.ajax({
        url: '/upload-files',
        data: data,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function ( data ) {
          debugger
          console.log(data.file.path);
          $('#imgAvatar').html(`<img src="/uploads/${data.file.filename}" ealt='Logo' style='width:80px; height:80px; '></br>`)
        }
    });

    e.preventDefault();
  });

  $("input[id=filterPriceup],#filterPricefrom,#filteryearDown,#filteryearUp,#search").change( debounce(function () {
    debugger
    const priceUp = $("input[id=filterPriceup]").val();
    const priceDown = $("#filterPricefrom").val();
    const yearDown = $(`select[id=filteryearDown]`).val();
    const yearUp = $(`select[id=filteryearUp]`).val();
    const search = $("#search").val();
    // const priceTo
    $.ajax({
      type: "GET",
      url: `/filter-car?priceUp=${priceUp}&priceDown=${priceDown}&yearDown=${yearDown}&yearUp=${yearUp}&search=${search}`,
      dataType: "text",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
        debugger
        dataParse = jQuery.parseJSON(data)
        $('tbody').html('')
        if (!dataParse.length) {
          $('tbody').append('По вашему запросу ничего не найдено')
        }
          for (let i=0; i<dataParse.length; i++ ) {
            $('tbody').append(`<tr>
              <td>${i+1}</td>
              <td>${dataParse[i].name}</td>
              <td>${dataParse[i].year}</td>
              <td>${dataParse[i].price}</td>
            </tr`)
          }
          $("div.pager").detach()
          paginate()
      }
    })
  }, 1000))

  $("#btnParsingUrl").click(function (e) {
    e.preventDefault();
    $(".ng-scope").show();
    $(".parsingContent").html('')
    const url = $("#urlToParcsing").val()
    $.ajax({
      type: "POST",
      url: "/parsing",
      data: { url: url },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {                
          let result = []
          for( let i=0; i<data.content.length; i++) {
            debugger
            match = data.content[i].info.split("\n")
            result = data.content[i].src.match(/".*"/)
            result = result[0].replace(/"/g, '')
            // $(".parsingContent").append('<div class="marketplace__gridItem"><img src="'+data.content[i].src.match(/".*"/)+'" alt="'+data.content[i].alt+'" title="'+ data.content[i].alt+'" width="180px" height="100px"> </div>')
            $(".parsingContent").append(`<div style="margin-right:10px">
              <img src="https:${result}" class="marketplace__gridItem alt="${match[0]}" title="${match[1]}"> 
            </div>`)
  
          }  
          $(".ng-scope").addClass("hide");         
      },
      error:  function(err) {
      },
    })
  })

  $("#dialog").hide(); //скрываем окно при загрузке страница
  paginate()
  checkUserAdmin()
  generateSelectOptionCarYear()
})


