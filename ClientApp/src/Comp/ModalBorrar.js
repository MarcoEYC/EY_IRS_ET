
import { useState } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap"

const ModeloProducto = {
    codigoDeProducto: "",
    }

const ModalDelete= ({ dispModalDel, setModalDel, eliminarProd}) => {

    const [codigo, setCodigo] = useState([])
    const [producto, setProducto] = useState(ModeloProducto);

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setCodigo(e.target.value)
    }
    

    const cerrarModal = () => {
        setModalDel(!dispModalDel)
    }

    return (
        <Modal isOpen={dispModalDel}>
            <ModalHeader>
                Eliminar producto
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Codigo de producto:</Label>
                        <Input name="codigo" onChange={(e) => actualizarDato(e)}></Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={() => eliminarProd(codigo)}>Eliminar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Cancelar</Button>
            </ModalFooter>
            
        </Modal>

        )
}

export default ModalDelete