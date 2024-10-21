import React, { useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  Table,
  Button,
  Stack,
  SelectPicker,
  Loader,
  Progress,
  ButtonGroup
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Cookies from 'js-cookie'; // Import js-cookie to access cookies
import MoreIcon from '@rsuite/icons/legacy/More';
import DrawerView from './DrawerView';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'; // Custom hooks
import { fetchNiqeData, approveNiqeData, rejectNiqeData } from '@/redux/slices/niqeSlice';
import { NiqeData } from '@/types/types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ActionCell } from './Cells'; // Assuming ActionCell contains actions like edit/delete

const { Column, HeaderCell, Cell } = Table;

// Define the stages for progress calculation
const progressStages = [
  'Input',
  'Review',
  'Survey',
  'Eksekusi By Mitra',
  'Testcom',
  'Uji Terima'
];

const DataTable = () => {
  const dispatch = useAppDispatch();
  const niqeData = useAppSelector((state) => state.niqe.niqeData) as NiqeData[];
  const status = useAppSelector((state) => state.niqe.status);
  const [showDrawer, setShowDrawer] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null); // Track loading state for buttons

  useEffect(() => {
    const roleFromCookie = Cookies.get('userRole'); // Get userRole from cookies
    setUserRole(roleFromCookie); // Store in state
  }, []);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNiqeData());
    }
  }, [dispatch, status]);

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc') => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handleRowClick = (rowData: any) => {
    navigate(`/dashboard/${rowData._id}`); // Navigate to the dashboard with the row ID
  };

  const ratingList = Array.from({ length: 5 }).map((_, index) => {
    return {
      value: index + 1,
      label: Array.from({ length: index + 1 })
        .map(() => '⭐️')
        .join('')
    };
  });

  const filteredData = () => {
    const filtered = niqeData.filter(item => {
      if (searchKeyword && !item.arnetDetails.arnet_name.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }

      if (rating && item.prioritas !== rating) {
        return false;
      }

      return true;
    });

    if (sortColumn && sortType) {
      return filtered.sort((a, b) => {
        let x: any = a[sortColumn];
        let y: any = b[sortColumn];

        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filtered;
  };

  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });
  
  const handleApprove = async (id: string) => {
    setLoadingId(id); // Set the loading state
    await dispatch(approveNiqeData(id)); // Dispatch the action
    setLoadingId(null); // Reset the loading state
    dispatch(fetchNiqeData()); // Refresh the data
  };
  
  const handleReject = async (id: string) => {
    setLoadingId(id); // Set the loading state
    await dispatch(rejectNiqeData(id)); // Dispatch the action
    setLoadingId(null); // Reset the loading state
    dispatch(fetchNiqeData()); // Refresh the data
  };

  // Calculate progress percentage
  const calculateProgress = (stage: string) => {
    const currentIndex = progressStages.findIndex(
      (progressStage) => progressStage.toLowerCase() === stage.toLowerCase()
    );
    return (currentIndex / (progressStages.length - 1)) * 100;
  };

  const renderProgressCell = (rowData: any) => {
    const progressStage = rowData.latestProgress; // Assume latestProgress stores the current stage name
    const progressPercent = calculateProgress(progressStage);

    return (
      <div>
        {/* Progress bar */}
        <Progress.Line percent={progressPercent} strokeColor="blue" />

        {/* Progress stage text */}
        <div style={{ marginTop: '10px', fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>
          {progressStage}
        </div>
      </div>
    );
  };

  if (status === 'loading') {
    return <Loader center backdrop content="Loading..." />;
  }

  if (status === 'failed') {
    return <div>Failed to load data</div>;
  }

  return (
    <>
      <Stack className="table-toolbar" justifyContent="space-between">
        <Button appearance="primary" onClick={() => setShowDrawer(true)}>
          Add Member
        </Button>

        <Stack spacing={6}>
          <SelectPicker
            label="Prioritas"
            data={ratingList}
            searchable={false}
            value={rating}
            onChange={setRating}
          />
          <InputGroup inside>
            <Input placeholder="Search" value={searchKeyword} onChange={setSearchKeyword} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
      </Stack>

      <Table
        height={window.innerHeight - 200} // Adjust based on the height of other components (like toolbar)
        rowHeight={80} // Increase the row height for more vertical space
        data={filteredData()}
        sortColumn={sortColumn}
        sortType={sortType}
        // onSortColumn={handleSortColumn}
        // onRowClick={handleRowClick}
        style={{ cursor: 'pointer', fontSize: '16px' }} // Increase font size
        cellBordered // Add borders to cells
      >
        {/* Ruas Kabel */}
        <Column width={150} align="center" sortable>
          <HeaderCell>Ruas Kabel</HeaderCell>
          <Cell>
            {(rowData) => (
              <Button 
                appearance="link" // Use link appearance for a cleaner look
                onClick={() => handleRowClick(rowData)} // Navigate to the dashboard with the row ID
              >
                {rowData.ruasDetails.ruas} {/* Display Ruas Kabel */}
              </Button>
            )}
          </Cell>
        </Column>

        {/* Arnet */}
        <Column minWidth={160} align='center' flexGrow={1} sortable>
          <HeaderCell>Arnet</HeaderCell>
          <Cell>
            {(rowData) => (
              <Button 
                appearance="link" // Use link appearance for a cleaner look
                onClick={() => handleRowClick(rowData)} // Navigate to the dashboard with the row ID
              >
                {rowData.arnetDetails.arnet_name} {/* Display Arnet */}
              </Button>
            )}
          </Cell>
        </Column>

        {/* Latest Progress with Buttons */}
        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Latest Progress</HeaderCell>
          <Cell>{(rowData) => renderProgressCell(rowData)}</Cell>
        </Column>

        {/* Prioritas */}
        <Column width={120} sortable>
          <HeaderCell>Prioritas</HeaderCell>
          <Cell>{(rowData) => Array.from({ length: rowData.prioritas }).map((_, i) => <span key={i}>⭐️</span>)}</Cell>
        </Column>

        {/* Perkiraan Revenue */}
        <Column width={160} sortable>
          <HeaderCell>Perkiraan Revenue</HeaderCell>
          <Cell>{(rowData) => currencyFormatter.format(rowData.perkiraan_revenue)}</Cell>
        </Column>

        {/* Tanggal Pengerjaan */}
        <Column width={160}>
          <HeaderCell>Tanggal Pengerjaan</HeaderCell>
          <Cell>
            {(rowData) => (
              <Input
                value={new Date(rowData.tanggal_pengerjaan).toLocaleDateString('id-ID')}
                readOnly
                size="md"
                style={{ textAlign: 'center' }} // Center the text in the input
              />
            )}
          </Cell>
        </Column>

        {/* Actions */}
        {userRole === 'admin' && (
          <Column width={300}>
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {rowData => {
                if (rowData.latestProgress.toLowerCase() === 'review' && rowData.approved === null) {
                  return (
                    <ButtonGroup>
                      <Button 
                        onClick={() => handleApprove(rowData._id)} 
                        color="blue" 
                        appearance="primary"
                        loading={loadingId === rowData._id} // Show loading spinner if this button is loading
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleReject(rowData._id)} 
                        color="red" 
                        appearance="primary"
                        loading={loadingId === rowData._id} // Show loading spinner if this button is loading
                      >
                        Reject
                      </Button>
                    </ButtonGroup>
                  );
                } else if (rowData.approved === true) {
                  return (
                    <Button color="blue" appearance="primary" disabled>
                      Approved
                    </Button>
                  );
                } else if (rowData.approved === false) {
                  return (
                    <Button color="red" appearance="primary" disabled>
                      Rejected
                    </Button>
                  );
                }
                return null;
              }}
            </Cell>
          </Column>
        )}
      </Table>

      <DrawerView open={showDrawer} onClose={() => setShowDrawer(false)} />
    </>
  );
};

export default DataTable;
