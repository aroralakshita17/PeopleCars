import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { InputNumber,Button, Form, Input ,  Select} from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR,GET_PEOPLE } from '../../queries'


const UpdateCar = props => {
  const { id, year, make, model, price, personId} = props
  const [updateCar] = useMutation(UPDATE_CAR)
  const { Option } = Select
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading.....'
  if (error) return `Error Message: ${error.message}`


  const onFinish = values => {
    const { year, make, model, price, personId} = values

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      }
    })

    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId
      }}
    >
      <Form.Item
        name='year'
        label="Year"
        rules={[{ required: true, message: 'Please input your Car Year!' }]}
      >
         <Input placeholder='Year' />
      
      </Form.Item>
      <Form.Item
        name='make'
        label="Make"
        rules={[{ required: true, message: 'Please input your Car Make!' }]}
      >
        <Input placeholder='i.e. Hyundai' />
      </Form.Item>

      <Form.Item
        name='model'
        label="Model"
        rules={[{ required: true, message: 'Please input your Car Model!' }]}
      >
        <Input placeholder='i.e. Sports i10' />
      </Form.Item>

      <Form.Item
        name='price'
        label="Price"
        rules={[{ required: true, message: 'Please input your Car Price!' }]}
      >
        <InputNumber precision={2} />
      </Form.Item>

      <Form.Item
        name='owner'
        label="Person"
        rules={[{ required: true, message: 'Please input your Car Owner!' }]}
      >
     <select style={{ width: 120,}} >
                {data.people.map(({ id, firstName, lastName }) => (
                        <Option value={id} key={id}>{firstName} {lastName}</Option>
                    ))}</select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button type='danger' onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  )
}

export default UpdateCar