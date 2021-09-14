$(document).ready(function() {
    // process bar
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init() {
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#desct').text(CONFIG.desct)
    $('#desck').text(CONFIG.desck)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion() {
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        backdrop: `
              rgb(58 69 78 / 47%)
              center bottom
              no-repeat
            `,
        imageUrl: 'img/firstquestion.JPG',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/birthday.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: CONFIG.btnIntro
    }).then(function secondQuestion() {
        $('.content').hide();
        Swal.fire({
            title: "Mãi là anh iem",
            backdrop: `
              rgb(58 69 78 / 47%)
              center bottom
              no-repeat
            `,
            html: "<video class='video' poster='img/1error.jpg' controls autoplay> <source src = 'video/IMG_E3362.MOV ' > </video> ",
            background: '#fff url("img/birthday.jpg") center top',
            confirmButtonText: "Ô cể"
        }).then(function() {
            $('.content').show(200);
        })

    })
}


function switchButton() {
    var audio = new Audio('sound/Sike.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}

function moveButton() {
    var audio = new Audio('sound/Duck.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init()

var n = 0;
$('#no').mousemove(function() {
    if (n < 1)
        switchButton();
    if (n > 1)
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width >= 900)
        switchButton();
})


function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// show popup
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Lói điiii :3'>",
        background: '#fff url("img/1iput-bg.jpg")',
        backdrop: `
              rgba(0,0,0,0.4)
              url("img/giphy.gif")
              center bottom
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#dc3545',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/hi.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#8bc34a',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            })
        }
    })
})