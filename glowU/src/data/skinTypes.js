import normal from "../assets/normal.png";
import kering from "../assets/kering.png";
import berminyak from "../assets/berminyak.png";
import kombinasi from "../assets/kombinasi.png";
import sensitif from "../assets/sensitif.png";
import jerawat from "../assets/jerawat.png";

const skinTypes = [
    { id: 1, type: "Normal", desc: "Kulit seimbang, tidak terlalu berminyak atau kering", image: normal },
    { id: 2, type: "Kering", desc: "Kulit kurang kelembapan dan terasa ketarik", image: kering },
    { id: 3, type: "Berminyak", desc: "Kulit cenderung berminyak terutama di T-zone", image: berminyak },
    { id: 4, type: "Kombinasi", desc: "Bagian wajah ada yang berminyak & ada yang kering", image: kombinasi },
    { id: 5, type: "Sensitif", desc: "Kulit mudah iritasi, merah, atau alergi", image: sensitif },
    { id: 6, type: "Jerawat", desc: "Kulit mudah iritasi, merah, atau berjerawat", image: jerawat }
];

export default skinTypes;