module.export=function (id,name,destination,pickup,mobile,wrtDate){
                const div = document.createElement('div');
                div.setAttribute('class','table-data');

                const idParagraph = document.createElement('p');
                idParagraph.setAttribute('class','id')
                idParagraph.textContent=id;
                div.appendChild(idParagraph);

                const recieverNameParagraph = document.createElement('p');
                recieverNameParagraph.setAttribute('class','receiver-name')
                recieverNameParagraph.textContent=name;
                div.appendChild(recieverNameParagraph);

                const destinationParagraph = document.createElement('p');
                destinationParagraph.setAttribute('class','destination-address')
                destinationParagraph.textContent=destination;
                div.appendChild(destinationParagraph);

                const pickupParagraph = document.createElement('p');
                pickupParagraph.setAttribute('class','pick-up-address')
                pickupParagraph.textContent=pickup;
                div.appendChild(pickupParagraph);

                const receiverPhoneNumberParagraph = document.createElement('p');
                receiverPhoneNumberParagraph.setAttribute('class','receiver-phone-number')
                receiverPhoneNumberParagraph.textContent=mobile;
                div.appendChild(receiverPhoneNumberParagraph);

                const dateParagraph = document.createElement('p');
                dateParagraph.setAttribute('class','date')
                dateParagraph.textContent=wrtDate;
                div.appendChild(dateParagraph);

                const locationParagraph = document.createElement('p');
                locationParagraph.setAttribute('class','current-location')
                locationParagraph.textContent='Storage';
                div.appendChild(locationParagraph);

                const statusParagraph = document.createElement('p');
                statusParagraph.setAttribute('class','delivery-status')
                statusParagraph.textContent='intransit';
                div.appendChild(statusParagraph);

                const deleteParagraph = document.createElement('p');
                deleteParagraph.setAttribute('class','delete')
                deleteParagraph.textContent="x";
                div.appendChild(deleteParagraph);

                const orderList = document.querySelector('div.rap');
                orderList.appendChild(div);

                return div
                
            }
