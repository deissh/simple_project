import {Button, Form, Input} from "antd";
import {PropsWithoutRef} from "react";

interface CardFormProps {
    onSubmit: (value: CardFormValue) => unknown;
}

export interface CardFormValue {
    cc_number: number;
    cc_owner: string;
    cc_exp_date: string;
    cc_cvv: number;
    amount: number;
}

export const CardForm = (props: PropsWithoutRef<CardFormProps>) => {
    const ccNumberRules = [{
        required: true,
        message: 'Please input valid credit card number!',
        pattern: /[0-9\s]{16}/,
        len: 16,
    }];

    return <Form
        name="billing_information"
        layout="vertical"
        requiredMark={false}
        onFinish={props.onSubmit}
    >
        <Form.Item
            label="Card Number"
            name="cc_number"
            rules={ccNumberRules}
        >
            <Input inputMode="numeric"
                   autoComplete="cc-number"
                   maxLength={16}
                   minLength={16}
                   placeholder="1234567890123456" />
        </Form.Item>

        <Form.Item
            name="cc_owner"
            label="Owner"
            rules={[{ required: true, message: "Owner name is required" }]}
        >
            <Input placeholder="Owner"/>
        </Form.Item>

        <Form.Item
            name="cc_exp_date"
            label="Expiration Date"
            rules={[{ required: true, message: "Expiration Date is required" }]}
        >
            <Input type="month" autoComplete="cc-exp"/>
        </Form.Item>

        <Form.Item
            name="cc_cvv"
            label="CVV"
            rules={[{ required: true, message: "CVV is required" }]}
        >
            <Input type="number"
                   inputMode="numeric"
                   maxLength={3}
                   minLength={3}
                   autoComplete="cc-csc"
                   placeholder="123" />
        </Form.Item>

        <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Order amount is required" }]}
        >
            <Input type="number"
                   prefix="$"
                   placeholder="10" min={0} />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" block>
                Pay
            </Button>
        </Form.Item>
    </Form>;
}
