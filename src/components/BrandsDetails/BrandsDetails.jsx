import React from 'react'
import createAxiosInstance from '../../library/api';
import { endPoint } from '../../enum/endpoint';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';


export default function BrandsDetails() {
let apiBase=createAxiosInstance()
let {id} =useParams

const getSpecificBrand = async () => {
    const response = await apiBase.get(`${endPoint.BRANDS}/${id}`);
    return response.data;
}
let {data,isError,isLoading,error} =useQuery({
    queryKey:['specificBrand'],
    queryFn:getSpecificBrand,
   select:((data)=>data.data)
})
console.log(data);

  return (
    <div className='py-24'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur laudantium eligendi ad similique natus nostrum dicta quaerat facilis obcaecati animi cumque incidunt laborum voluptatem suscipit, blanditiis libero praesentium voluptas est. Magni laudantium tempora sapiente nesciunt quis illum adipisci asperiores dolorum voluptate praesentium explicabo voluptates placeat, natus est reiciendis. Laboriosam rem unde harum quidem tempore veniam quibusdam delectus vel et odio minima facere explicabo eum, ducimus voluptatem repudiandae doloremque sapiente. Quidem facilis quaerat optio! Voluptas odio nesciunt, quibusdam exercitationem obcaecati nemo aperiam et illum in deserunt incidunt omnis quis maiores! Veritatis nihil ipsum vel? Commodi incidunt dolor corporis aliquam iusto a, quod tempore laborum obcaecati ipsam necessitatibus officia cumque? Modi facilis et, cupiditate similique ea dolorem. Laboriosam delectus natus dolores, accusamus iure inventore eius sequi beatae ipsa aspernatur numquam ipsum quis omnis ratione labore. Nihil in incidunt sunt eveniet repudiandae nostrum quam debitis, reprehenderit corrupti consequuntur quos placeat repellat sapiente ut officia laborum reiciendis sint magni nemo? Placeat laudantium voluptas officia unde quisquam eius asperiores vitae sit laboriosam iste neque totam dolorem suscipit ratione deserunt magnam ut incidunt sunt tenetur provident, amet numquam. Nam voluptas aliquam facilis corporis distinctio voluptatibus pariatur? Dignissimos est sapiente magnam sunt quis! Numquam maiores illum pariatur id consectetur veniam voluptatum autem iure facere odio? Voluptatibus illum dignissimos ipsum culpa. Consequuntur sapiente a minima, debitis aperiam at ab magnam nesciunt perferendis amet ipsum nihil est ipsam aliquam voluptatum eum vero culpa. Ad, corporis. Labore corporis, provident eaque aperiam rerum dolore molestiae enim ipsam laboriosam nemo ad cum, fugit porro? Officia maxime eligendi, mollitia explicabo magni animi facere, quas labore voluptatem voluptates error illo doloremque. Deserunt obcaecati minima dicta, eaque vero, alias quasi sint voluptas quo veniam odio molestias aliquid dolor ipsam soluta tempora exercitationem sequi! Facilis omnis, corporis odio voluptatum culpa sapiente blanditiis officia repudiandae eius fugiat officiis explicabo repellat minus error ab minima. Aperiam possimus pariatur esse fugiat numquam! Soluta dicta illum esse pariatur tempore id aut? Doloribus consectetur aspernatur, dignissimos debitis facilis iusto exercitationem ratione autem tempore perspiciatis quis itaque recusandae quasi perferendis mollitia ducimus quidem ad quibusdam consequatur iste odio laboriosam possimus blanditiis! Neque possimus vero asperiores a aperiam nobis consectetur odit quo modi explicabo, necessitatibus aliquam perferendis ipsum perspiciatis officiis, cum sapiente similique quae. Magni odit voluptatem ipsam, recusandae dolore laboriosam nam eaque accusamus tenetur illum nulla delectus dignissimos, iure amet explicabo, doloremque ratione reiciendis! Recusandae odit sed provident perspiciatis ipsum optio explicabo ea, nemo assumenda cum enim sunt hic accusamus in reprehenderit at, odio et libero temporibus laudantium dolorum. Pariatur id libero doloribus tenetur accusantium minus nobis dignissimos eaque at amet ea ipsum sunt, commodi consectetur, reiciendis numquam expedita perferendis tempore dolorem modi similique officia illum, dolore eveniet! Delectus nihil quae ipsum doloribus illo enim facilis libero, maxime minima hic atque pariatur sed earum magnam ut in perferendis, eum praesentium nesciunt consequatur repellendus explicabo, reiciendis veniam quibusdam. Amet non voluptatum voluptate, accusamus mollitia sapiente aut modi dolore fugit doloribus eum commodi laboriosam quidem facilis nostrum deserunt dicta, explicabo adipisci natus similique.</p>
    </div>
  )
}
