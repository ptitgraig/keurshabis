<!DOCTYPE HTML>
<html lang="en">
<head>
<!-- Force latest IE rendering engine or ChromeFrame if installed -->
<!--[if IE]>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<![endif]-->
<meta charset="utf-8">
<title>Ajouter un bijou à la boutique</title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<div class="la-anim-10"></div>


<div class="container">

    <h1 style="text-align:center;">Ajouter un bijou dans la boutique Keursha</h1>
    <hr/>
    <blockquote>
        <p>Mon coeur en chat,<br>
        Ce petit outil te sers à ajouter des bijoux sur ton site. Il a été fait avec beaucoup d'amour comme le témoigne ce maxi coeur en bas de la page.<br>
        Je t'aime ma chérie :).</p>
    </blockquote>
    
    <br>

    <div class="alert server-message" style="display:none;"></div>


    <!-- The file upload form used as target for the file upload widget -->
    <form id="keurshaAddForm" action="server/generateJSON.php" method="POST" enctype="multipart/form-data" class="form-horizontal">
        <div class="form-group">
            <label for="title" class="col-sm-2 control-label">Type de bijou</label>
            <div class="col-sm-5">
                <select name="type" class="form-control input-lg">
                    <option value="bague">Bague</option>
                    <option value="fiancaille">Bague de fiancialle</option>
                    <option value="alliance">Alliance</option>
                    <option value="collier">Collier</option>
                    <option value="pendentif">Pendentif</option>
                    <option value="boucle">Boucle d'oreille</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="title" class="col-sm-2 control-label">Intitulé</label>
            <div class="col-sm-5">
                <input type="text" class="form-control input-lg" id="title" name="title" placeholder="Ex: Bague Cartier 3 diamants">
                <span class="text-danger"></span>
            </div>
        </div>
        <div class="form-group">
            <label for="price" class="col-sm-2 control-label">Prix</label>
            <div class="col-sm-5">
               <div class="input-group">
                    <input id="price" type="text" name="price" class="form-control input-lg" placeholder="Ex: 999.99">
                    <span class="input-group-addon">&euro;</span>
                </div>
                <span class="text-danger"></span>
            </div>
            
        </div>
        <div class="form-group">
            <label for="price" class="col-sm-2 control-label">Description</label>
            <div class="col-sm-5">
                <textarea class="form-control input-lg" rows="3" name="description"></textarea>
                <span class="text-danger"></span>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
                <span class="btn btn-default fileinput-button">
                    <i class="glyphicon glyphicon-plus"></i>
                    <span>Ajouter une image...</span>
                    <input id="imgFile" type="file" name="imgfile">
                </span>
                <span class="btn btn-danger fileinput-cancel hidden">
                    <i class="glyphicon glyphicon-remove"></i>
                    <span>Annuler</span>
                </span>
            </div>
        </div>
        
        <table role="presentation" class="table col-sm-offset-2 col-sm-5 table-striped"><tbody class="files"></tbody></table>
        <hr/>
        <br/>
        <div class="form-group submit">
            <div class="col-sm-offset-2 col-sm-8">
              <button type="submit" class="btn btn-success btn-lg btn-block">Ajouter le bijou à la boutique</button>
            </div>
        </div>
    </form>
    <br>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Remarques</h3>
        </div>
        <div class="panel-body">
            <ul>
                <li>La taille maximim des images est de <strong>1Mo</strong>, mais je te recommande chaudement de mettre des images plus petites, sinon ton site va devenir tout lent.</li>
                <li>Seules les images de type (<strong>JPG, GIF, PNG</strong>) sont autorisées.</li>
            </ul>
        </div>
    </div>
    
    <div id="chest">
        <div class="heart left side top"></div>
        <div class="heart center">&hearts;</div>
        <div class="heart right side"></div>
    </div>

</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="js/jquery.form.min.js"></script>
<script src="js/modernizr.min.js"></script>

<script type="text/javascript">
function beforeSubmit(){

    // check form value
    if ($('#title').val() === '') {
        $(".server-message").addClass('alert-warning').html("<strong>Ooops !</strong><br/> Ma chérie, tu as oublié de choisir une image :)").slideDown('fast');
        return false;
    }

    //check whether browser fully supports all File API
   if (window.File && window.FileReader && window.FileList && window.Blob) {
      
        if( !$('#imgFile').val()) { //check empty input filed {
            $(".server-message").addClass('alert-warning').html("<strong>Ooops !</strong><br/> Ma chérie, tu as oublié de choisir une image :)").slideDown('fast');
            return false
        }
        
        var fname = $('#imgFile')[0].files[0].name; //get file size
        var fsize = $('#imgFile')[0].files[0].size; //get file size
        var ftype = $('#imgFile')[0].files[0].type; // get file type

        //allow only valid image file types 
        switch(ftype) {
            case 'image/png': case 'image/gif': case 'image/jpeg': case 'image/pjpeg':
                break;
            default:
                $(".server-message").addClass('alert-warning').html("<strong>"+ftype+"</strong> n'est pas un format d'image supporté.").slideDown('fast');
                return false
        }
        
        //Allowed file size is less than 1 MB (1048576)
        if(fsize>1048576)  {
            $(".alert-warning").html("<strong>"+fsize +"</strong> Burps! <br />L'image est trop grosse, je ne peux pas l'avaler. Essayes d'en trouver une moins grosse.").slideDown('fast');
            return false
        }
                
        /*$('#submit-btn').hide(); //hide submit button
        $('#loading-img').show(); //hide submit button*/
        if ($(".server-message").is(':visible')) {
            $(".server-message").slideDown('fast');
        }
        $('.btn-success').attr("disabled", "disabled");


    } else {
        //Output error to older unsupported browsers that doesn't support HTML5 File API
        $(".server-message").addClass('alert-warning').html("Hmm. Le navigateur que tu utilises doit un peu vintage, tu devrais essayer un navigateur plus récent.").slideDown('fast');
        return false;
    }
}

    // post-submit callback 
function showResponse(data)  { 
    // for normal html responses, the first argument to the success callback 
    // is the XMLHttpRequest object's responseText property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'xml' then the first argument to the success callback 
    // is the XMLHttpRequest object's responseXML property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'json' then the first argument to the success callback 
    // is the json data object returned by the server
    $('.la-anim-10').addClass('la-animate');
    setTimeout( function() {
        resetForm();
        $('.la-anim-10').removeClass('la-animate');
        $('.btn-success').removeAttr("disabled");
        $('.fileinput-button').removeAttr("disabled");

        $('.server-message').removeClass('alert-info alert-danger alert-success alert-warning');
        if (data.type == 'error') {
            $('.server-message').addClass('alert-danger').html('<span class="glyphicon glyphicon-remove"></span> '+data.message).slideDown("fast");
        }
        if (data.type == 'success') {
            $('.server-message').addClass('alert-success').html('<span class="glyphicon glyphicon-ok"></span> '+data.message).slideDown("fast");
        }
        if (data.type == 'info') {
            $('.server-message').addClass('alert-info').html('<span class="glyphicon glyphicon-info-sign"></span> '+data.message).slideDown("fast");
        }
    }, 1000 );

    setTimeout( function() {
        $('.server-message').removeClass('alert-info alert-danger alert-success alert-warning').slideUp("fast");
    }, 4000 );


} 

function resetForm () {
    $('.fileinput-cancel').addClass('hidden');
    $('.fileinput-button span').html('Ajouter une image...');
    $('.fileinput-button i').removeClass('glyphicon-ok').addClass('glyphicon-plus');
    $('.fileinput-button').removeClass('btn-success').addClass('btn-default'); 
}

$(document).ready(function() { 

    $('input[type=file]').on('change', function(e){
        $('.fileinput-cancel').removeClass('hidden');
        $('.fileinput-button span').html('Image sélectionnée : '+$('#imgFile')[0].files[0].name);
        $('.fileinput-button i').removeClass('glyphicon-plus').addClass('glyphicon-ok');
        $('.fileinput-button').removeClass('btn-default').addClass('btn-success');
    });

    $('.fileinput-cancel').on('click', function() {
        resetForm();
    });

    // validation sortie de champ
    $('#title').on('blur', function(){
        $this = $(this);
        if ($this.val() === '') {
            $this.parents('.form-group').addClass('has-error');
            $this.parents('.form-group').find('.text-danger').html("L'intitulé du bijou est obligatoire.");
        } else {
            $this.parents('.form-group').removeClass('has-error');
            $this.parents('.form-group').find('.text-danger').html('');
        }
    });
    $('#price').on('blur', function(){
        $this = $(this);
        if ($this.val() === '') {
            $this.parents('.form-group').addClass('has-error');
            $this.parents('.form-group').find('.text-danger').html("Le prix du bijou est obligatoire.");
        }
        if ($this.val() !== '' && $.isNumeric($this.val()) === false) {
            $this.parents('.form-group').addClass('has-error');
            $this.parents('.form-group').find('.text-danger').html("Le prix doit être un chiffre.");
        }
        if ($this.val() !== '' && $.isNumeric($this.val()) === true) {
            $this.parents('.form-group').removeClass('has-error');
            $this.parents('.form-group').find('.text-danger').html("");
        }
    });

    var options = { 
        target: '.alert-warning',   // target element(s) to be updated with server response 
        beforeSubmit: beforeSubmit,  // pre-submit callback 
        resetForm: true,        // reset the form after successful submit 
        success: showResponse,
        dataType: 'json'
    }; 
        
    $('#keurshaAddForm').submit(function() { 
        $(this).ajaxSubmit(options);  //Ajax Submit form            
        // return false to prevent standard browser submit and page navigation 
        return false; 
    });

});
</script>

</body> 
</html>
