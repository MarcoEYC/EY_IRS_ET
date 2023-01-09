import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ModalProduct from "./Comp/ModalCrear";
import ModalDelete from "./Comp/ModalBorrar";

const App = () => {

    const [productos, setProductos] = useState([])
    const [dispModal, setModal] = useState(false);
    const [dispModalDel, setModalDel] = useState(false);
    const [editar, setEditar] = useState(null)
    

    const mostrarProductos = async () => {
        const response = await fetch("api/consulta/Lista");

        if (response.ok) {
            const dataproductos = await response.json();
            setProductos(dataproductos);
        } else {
            console.log("Status code" + response.status);
        }
    }

    useEffect(() => {
        mostrarProductos();
    }, [])

    const guardarProducto = async (producto) => {
        const response = await fetch("api/consulta/Nuevo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(producto)
        })
        if (response.ok) {
            setModal(!dispModal);
            mostrarProductos();

        }

    }

    const editarProducto = async (producto) => {
        const response = await fetch("api/consulta/Actualizar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(producto)
        })
        if (response.ok) {
            setModal(!dispModal);
            mostrarProductos();

        }

    }

    const eliminarProducto = async (codigo) => {

        const response = await fetch("api/consulta/Eliminar/" + codigo, {
            method: 'DELETE',
        })

        if (response.ok) {
            setModalDel(!dispModalDel);
            mostrarProductos();
        }
    }

    const enviarDatos = (producto) => {
        setEditar(producto)
        setModal(!dispModal)

    }

    return (
        <div className="container text-center mx-auto" style={{ marginTop: '15px' }} >
            <h2 className="text-center">Inventario de productos</h2>
            <table className="table table-striped mx-auto" >
                <thead>
                    <tr>
                        <th scope="col">Indice</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map(
                            (item, index) => (
                                <tr key={item.id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.codigoDeProducto}</td>
                                    <td>{item.nombreArt}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.cantidad}</td>
                                    <td> <button className="btn btn-warning" onClick={() => enviarDatos(item)} >Editar</button></td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            <div className="row" style={{ marginBottom: '15px' }}>
                <div className="text center mx-auto" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <button className="btn btn-success" onClick={()=> setModal(!dispModal)}>Insertar Articulo</button>
                    <button className="btn btn-danger" onClick={() => setModalDel(!dispModalDel)} >Eliminar Articulo</button>
                </div>
            </div>
            <ModalProduct
                dispModal={dispModal}
                setModal={setModal}
                guardarProd={guardarProducto}
                editar={editar}
                setEditar={setEditar}
                editarProducto={editarProducto}
            />
            <ModalDelete
                dispModalDel={dispModalDel}
                setModalDel={setModalDel}
                eliminarProd={eliminarProducto} 
            />
        </div>
    )
}

export default App;