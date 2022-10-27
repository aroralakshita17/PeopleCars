import { useState } from 'react'
import React from 'react';
import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCar from '../forms/UpdateCar'
const dollar = '$'
const getStyles = () => ({
    card: {
        width: '500px'

    }
})
const Car = props => {
    const { id, year, model, make, price, personId } = props
    const styles = getStyles()

    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => setEditMode(!editMode)

    return (
        <>
            {editMode ? (
                <UpdateCar
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    onButtonClick={handleButtonClick}
                />
            ) : (
                <Card
                    style={styles.card}

                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveCar id={id} />
                    ]}
                >{year} {model}  {dollar}{price} </Card>
            )}
        </>
    )
}

export default Car