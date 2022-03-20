import { useState } from "react";
import { Card, Layout, Spin} from 'antd';
import { useNavigate } from 'react-router-dom';
import { CardForm, CardFormValue } from "../../components/card-form";
import { api } from "../../api";

import styles from './card-input.module.scss';


const CardInput = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSend = (value: CardFormValue) => {
        setLoading(true);

        api.pay(value)
            .then(console.debug)
            .then(() => navigate("/done"))
            .catch(alert)
            .finally(() => setLoading(false));
    }

    return <Layout className={styles.root}>
        <Layout.Header className={styles.header}>
            <div className="logo"/>
        </Layout.Header>

        <Layout.Content className={styles.content}>
            <Card className={styles.card} title="Billing info">
                <Spin spinning={loading}>
                    <CardForm  onSubmit={onSend}/>
                </Spin>
            </Card>
        </Layout.Content>
    </Layout>;
}

export default CardInput;