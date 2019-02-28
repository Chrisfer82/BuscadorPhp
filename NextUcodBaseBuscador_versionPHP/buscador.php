<?php

class datos
{
    private $datos;

    public function __construct()
    {
        $this->initCOmponents();
    }

    private function initCOmponents()
    {
        $json = file_get_contents("data-1.json");
        $this->datos = json_decode($json, true);
    }

    public function getDataFilter()
    {
        $precio = explode(';', $_REQUEST['precio']);
        $tipo = $_REQUEST['tipo'];
        $ciudad = strtoupper($_REQUEST['ciudad']);
        $filas = array();
        foreach ($this->datos as $reg) {
            $valor = doubleval(str_replace(',', '', $reg['Precio']));
            $filter1 = (empty($ciudad) ? true : (count(explode($ciudad, strtoupper($reg['Ciudad']))) > 1 ? true : false));
            $filter2 = ($reg['Tipo'] == $tipo || $tipo == 'todos' ? true : false);
            $filter3 = ($valor >= $precio[0] && $valor <= $precio[1] ? true : false);

            if ($filter1 && $filter2 && $filter3) {
                $filas[] = $reg;
            }
        }

        return $filas;
    }

    public function getCity()
    {
        $filas = array();
        foreach ($this->datos as $reg) {
            $filas[$reg['Ciudad']] = $reg['Ciudad'];
        }

        return $filas;

    }

}


$datos = new Datos();
$function = $_REQUEST["function"];
$response = $datos->$function();
echo json_encode(array("success" => true, "data" => $response));
