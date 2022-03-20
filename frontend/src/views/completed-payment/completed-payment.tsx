import { Result } from "antd";
import { useNavigate } from "react-router-dom";

import styles from './completed-payment.module.scss';

const CompletedPayment = () => {
    const navigate = useNavigate();
    const redirectBack = () => navigate('/');

    setTimeout(redirectBack, 3 * 1000);

    return <Result
        className={styles.root}
        status="success"
        title="Successfully!"
    />;
}

export default CompletedPayment;