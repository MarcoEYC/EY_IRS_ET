
import { useState, useEffect } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap"

const ModeloProducto = {
    id:0,
    codigoDeProducto: "",
    nombreArt: "",
    descripcion: "",
    cantidad: "",
    }

const ModalProduct = ({ dispModal, setModal, guardarProd, editar, setEditar, editarProducto}) => {

    const [producto, setProducto] = useState(ModeloProducto);

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setProducto(
            {
                ...producto,
                [e.target.name]: e.target.value
                }
            )
    }

    const enviarDato = () => {
        if (producto.id == 0) {
            guardarProd(producto)
        } else {
            editarProducto(producto)
        }

        setProducto(ModeloProducto)
    }

    useEffect(() => {
        if (editar != null) {
            setProducto(editar)
        } else {
            setProducto(ModeloProducto)
        }
    }, [editar])

    const cerrarModal = () => {

        setModal(!dispModal)
        setEditar(null)
    }

    return (
        <Modal isOpen={dispModal}>
            <ModalHeader>
                Detalles de producto
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Codigo</Label>
                        <Input name="codigoDeProducto" onChange={(e) => actualizarDato(e)} value={producto.codigoDeProducto}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombreArt" onChange={(e) => actualizarDato(e)} value={producto.nombreArt}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripcion</Label>
                        <Input name="descripcion" onChange={(e) => actualizarDato(e)} value={producto.descripcion}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Cantidad</Label>
                        <Input name="cantidad" onChange={(e) => actualizarDato(e)} value={producto.cantidad}></Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDato}>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Cancelar</Button>
            </ModalFooter>
            
        </Modal>

        )
}

export default ModalProduct