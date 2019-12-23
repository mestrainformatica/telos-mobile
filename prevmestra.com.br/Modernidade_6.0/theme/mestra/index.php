<html lang="pt-br">
<?php include "templates/header.php"; ?>
<?php include "templates/sidebar.php"; ?>
<?php 
if (!$_GET['page']):
	include "pages/home.php"; 
else:
	include "pages/".$_GET['page'].".php"; 
endif;
?>
<?php include "templates/footer.php"; ?>
</html>