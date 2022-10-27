import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useQuery} from '@apollo/client'
import { Button, Form, Input,  Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import { ADD_CAR,GET_CARS } from '../../queries'
import { GET_PEOPLE } from '../../queries'

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [addCar] = useMutation(ADD_CAR)
  const{Option} = Select

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const onFinish = values => {
    const { year, make, model, price, personId } = values
    year = year.toString();
    price = price.toString();

    addCar({
      variables: {
            id,
             year,
                make,
                model,
                price,
                personId
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS })
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar]
          }
        })
      }
    })
  }

  return (
    <Form
      form={form}
      name='add-car-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        label='Year'
        rules={[{ required: true, message: 'Please input your car Year!' }]}
      >
        <Input placeholder='Year' />
     
      </Form.Item>


      <Form.Item
        name='make'
        label='Make'
        rules={[{ required: true, message: 'Please input your car Make!' }]}
      >
        <Input placeholder='i.e. Hyundai' />
      </Form.Item>

      <Form.Item
        name='model'
        label='Model'
        rules={[{ required: true, message: 'Please input your car Model!' }]}
      >
        <Input placeholder='i.e. Sport i10' />
      </Form.Item>

      <Form.Item
        name='price'
        label='Price'
        rules={[{ required: true, message: 'Please input your car Price!' }]}
      >
         <Input placeholder='Price' />
         
      </Form.Item>

      <Form.Item
        name='owner'
        label='Person'
        rules={[{ required: true, message: 'Please input your car Owner Nmae!' }]}
      >
       
       <Select style={{ width: 130}}>
                {data.people.map(({ id, firstName, lastName }) => 
                (

                   <Option value={id} key={id}>{firstName} {lastName}</Option>
                  
                    ))}
                    </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddCar