import {useState, useEffect, useMemo} from 'react';
import {collection, getDocs, query} from 'firebase/firestore';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {db, addData} from '../../authentication/components/firebase.js';
import DataTable from 'examples/Tables/DataTable';

import FullRecordsDateStep from 'components/DateTimePickerModal/FullRecordsDateStep.js';
import TransferDocumentsToCompany from 'components/DateTimePickerModal/TransferDocumentsToCompany.js';
import ElectricalConnectionAgreementStep from 'components/DateTimePickerModal/ElectricalConnectionAgreementStep.js';
import ConfirmReceiptOfConnectionAgreementStep from 'components/DateTimePickerModal/ConfirmReceiptOfConnectionAgreementStep.js';
import UploadFileDialog from 'components/Dialog/UploadFileDialog.js';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import {COLUMNS} from './columns.js';
import ProposalForAcceptanceStep from 'components/DateTimePickerModal/ProposalForAcceptanceStep.js';
import CompleteTheAcceptanceTestStep from 'components/DateTimePickerModal/CompleteTheAcceptanceTestStep.js';
import {getCurrentDate, convertDateTimeStringToVnTime, getDocumentsWithCondition} from '../../../components//utils.js';
import {useAuthUser, useSignIn} from 'react-auth-kit';
import {rolePermissionRule} from '../../authentication/sign-in/rolePermissionRule.js';
import GetNextStep from './GetNextStep.js';
import UpdateDataStep from './UpdateDataStep.js';

async function getDocuments() {
  const q = query(collection(db, 'Documents'));
  const querySnapshot = await getDocs(q);
  const docData = [];
  querySnapshot.forEach((doc) => {
    docData.push(doc.data());
  });
  return docData;
}

function CreateDocument() {
  const [data, setData] = useState([]);
  const user = useAuthUser()();

  async function fetchData() {
    const docData = await getDocuments();
    await setData(
      docData.map((current) => {
        return {
          ...current,

          TepDinhKemLucTaoHoSo: current.TepDinhKemLucTaoHoSo ? (
            <div>
              <a href={current.TepDinhKemLucTaoHoSo} target="_blank">
                Xem t???p l??c t???o h??? s??
              </a>
              {current.TepDinhKemChuyenVePKT ? (
                <div>
                  <a href={current.TepDinhKemChuyenVePKT} target="_blank">
                    Xem t???p b?????c v??? PKT
                  </a>
                </div>
              ) : (
                ''
              )}
              {current.TepDinhKemHoSoThoaThuan ? (
                <div>
                  <a href={current.TepDinhKemHoSoThoaThuan} target="_blank">
                    Xem t???p b?????c th???a thu???n
                  </a>
                </div>
              ) : (
                ''
              )}
              {current.TepDinhKemNgayNhanThoaThuan ? (
                <div>
                  <a href={current.TepDinhKemNgayNhanThoaThuan} target="_blank">
                    Xem t???p b?????c nh???n th???a thu???n
                  </a>
                </div>
              ) : (
                ''
              )}
              {current.TepDinhKemNgayDeNghiNghiemThu ? (
                <div>
                  <a href={current.TepDinhKemNgayDeNghiNghiemThu} target="_blank">
                    Xem t???p b?????c ????? ngh??? nghi???m thu
                  </a>
                </div>
              ) : (
                ''
              )}
              {current.TepDinhKemNgayHoanThanhNghiemThu ? (
                <div>
                  <a href={current.TepDinhKemNgayHoanThanhNghiemThu} target="_blank">
                    Xem t???p b?????c ho??n th??nh nghi???m thu
                  </a>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          ),
          NgayDeNghiDauNoi:
            current.NgayDeNghiDauNoi === undefined || current.NgayDeNghiDauNoi === null
              ? ''
              : current.NgayDeNghiDauNoi,
          NgayChuyenHoSoThoaThuan:
            current.NgayChuyenHoSoThoaThuan === undefined ||
            current.NgayChuyenHoSoThoaThuan === null
              ? ''
              : current.NgayChuyenHoSoThoaThuan,
          NgayChuyenVePKT:
            current.NgayChuyenVePKT === undefined || current.NgayChuyenVePKT === null
              ? ''
              : current.NgayChuyenVePKT,
          NgayNopHoSoDayDu:
            current.NgayNopHoSoDayDu === undefined || current.NgayNopHoSoDayDu === null
              ? ''
              : current.NgayNopHoSoDayDu,
          BuocTiep: (
            <MDBox>
              {(rolePermissionRule(user.role, 'UpdateDataStep') && <UpdateDataStep role={user.role}
                refreshData={fetchData}
                documentId={current.MaHoSo}
                documentData={current}
                key = 'UpdateDataStep'
                ></UpdateDataStep>)}
              <GetNextStep
                role={user.role}
                refreshData={fetchData}
                documentId={current.MaHoSo}
                documentData={current}
                currentStep={
                  current.NgayNopHoSoDayDu == null
                    ? 'X??c nh???n ????? HS'
                    : current.NgayNopHoSoDayDu != null &&
                      (current.NgayChuyenVePKT === null || current.NgayChuyenVePKT === undefined)
                    ? 'Chuy???n v??? c??ng ty'
                    : current.NgayNopHoSoDayDu != null &&
                      current.NgayChuyenVePKT != null &&
                      (current.NgayChuyenHoSoThoaThuan === undefined ||
                        current.NgayChuyenHoSoThoaThuan === null)
                    ? 'Tho??? thu???n ?????u n???i'
                    : current.NgayNhanHoSoThoaThuan === null ||
                      current.NgayNhanHoSoThoaThuan === undefined
                    ? 'Nh???n th???a thu???n ?????u n???i'
                    : current.NgayDeNghiNghiemThu === null ||
                      current.NgayDeNghiNghiemThu === undefined
                    ? '????? ngh??? nghi???m thu'
                    : current.NgayHoanThanhNghiemThu === null ||
                      current.NgayHoanThanhNghiemThu === undefined
                    ? 'Ho??n th??nh nghi???m thu'
                    : 'Ho??n t???t'
                }
              ></GetNextStep>
            </MDBox>
          ),

        };
      })
    );
  }
  useEffect(() => {
    fetchData();
  }, []);
  const columns = useMemo(() => COLUMNS, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addData('Documents', e.target[0].value, {
      MaHoSo: e.target[0].value,
      NgayDeNghiDauNoi: convertDateTimeStringToVnTime(e.target[2].value),
      TenKhachHang: e.target[4].value,
      CongSuatDeNghi: e.target[6].value,
      NgayNopHoSoDayDu: convertDateTimeStringToVnTime(e.target[8].value),
      TepDinhKemLucTaoHoSo: e.target[10].value,
      TaoBoi: (user)?user.user:"",
      NgayTao: getCurrentDate(),
      DonVi: user.branch,
    });
    if (result.includes('th??nh c??ng')) {
      fetchData();
      toast.success(result, {
        autoClose: 3000,
        closeOnClick: true,
        position: 'bottom-right',
      });
    } else {
      toast.error(result, {
        autoClose: 3000,
        closeOnClick: true,
        position: 'bottom-right',
      });
    }
  };

  return (
    <MDBox mt={3}>
      {rolePermissionRule(user.role, 'CreateDocument') && (
        <MDBox mb={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox
              mb={2}
              display="grid"
              gridTemplateColumns="15% 15% 40% 15% 15%"
              style={{
                gridGap: '10px',
                paddingRight: '40px',
                boxSizing: 'border-box',
              }}
            >
              <MDInput
                style={{gridColumn: '1 / span 1'}}
                type="text"
                label="M?? h??? s??"
                required
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
              <MDInput
                style={{gridColumn: '2 / span 1'}}
                type="date"
                label="Ng??y ????? ngh??? ?????u n???i"
                required
                variant="outlined"
                fullWidth
                InputLabelProps={{shrink: true}}
              />
              <MDInput
                style={{gridColumn: '3 / span 1'}}
                type="text"
                label="T??n kh??ch h??ng"
                required
                fullWidth
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
              <MDInput
                style={{gridColumn: '4/ span 1'}}
                type="text"
                label="C??ng su???t ????? ngh???"
                required
                fullWidth
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
              <MDInput
                style={{gridColumn: '5 / span 1'}}
                type="date"
                label="Ng??y n???p ?????y ????? h??? s??"
                fullWidth
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
            </MDBox>

            <MDBox mb={2} display="grid" gridTemplateColumns="60% 40%" gridgap="10px">
              <UploadFileDialog />
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                T???o h??? s??
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      )}
      <MDBox mb={3}>
        <DataTable
          canSearch={true}
          table={{
            columns: COLUMNS,
            rows: data,
          }}
        />
      </MDBox>
      <ToastContainer position="bottom-right" limit={1} />
    </MDBox>
  );
}

export default CreateDocument;
